import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Serve the Figma exporter HTML file
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "figma-exporter.html"));
  });

  // Serve the presentation HTML file
  app.get("/presentation", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "presentation.html"));
  });

  // Helper function to extract relevant data from Figma JSON
  function extractPrototypeData(figmaData: any) {
    const prototypeData: any = {
      frames: [],
      interactions: []
    };

    function traverseNode(node: any, parentType = '') {
      if (node.type === 'FRAME') {
        // Extract frame information
        const frame = {
          id: node.id,
          name: node.name,
          type: node.type,
          absoluteBoundingBox: node.absoluteBoundingBox,
          children: [] as any[]
        };

        // Extract text content from children
        if (node.children) {
          frame.children = extractTextAndInteractions(node.children);
        }

        // Extract interactions
        if (node.interactions && node.interactions.length > 0) {
          node.interactions.forEach((interaction: any) => {
            prototypeData.interactions.push({
              sourceId: node.id,
              sourceName: node.name,
              trigger: interaction.trigger,
              actions: interaction.actions,
              absoluteBoundingBox: node.absoluteBoundingBox
            });
          });
        }

        prototypeData.frames.push(frame);
      }

      if (node.children) {
        node.children.forEach((child: any) => traverseNode(child, node.type));
      }
    }

    function extractTextAndInteractions(children: any[]): any[] {
      const extracted: any[] = [];
      
      children.forEach(child => {
        if (child.type === 'TEXT' && child.characters) {
          extracted.push({
            type: 'TEXT',
            characters: child.characters,
            absoluteBoundingBox: child.absoluteBoundingBox
          });
        }
        
        if (child.interactions && child.interactions.length > 0) {
          child.interactions.forEach((interaction: any) => {
            prototypeData.interactions.push({
              sourceId: child.id,
              sourceName: child.name || 'Unnamed Element',
              trigger: interaction.trigger,
              actions: interaction.actions,
              absoluteBoundingBox: child.absoluteBoundingBox
            });
          });
        }

        if (child.children) {
          extracted.push(...extractTextAndInteractions(child.children));
        }
      });

      return extracted;
    }

    if (figmaData.document && figmaData.document.children) {
      figmaData.document.children.forEach((page: any) => {
        if (page.children) {
          page.children.forEach((child: any) => traverseNode(child));
        }
      });
    }

    return prototypeData;
  }

  // AI Test Case Generation endpoint
  app.post("/api/generate-test-cases", async (req, res) => {
    try {
      const { figmaData, aiConfig } = req.body;
      
      if (!figmaData) {
        return res.status(400).json({ 
          success: false, 
          message: "Figma data is required" 
        });
      }

      if (!aiConfig || !aiConfig.apiKey) {
        return res.status(400).json({ 
          success: false, 
          message: "AI configuration and API key are required" 
        });
      }

      // Extract only relevant prototype data to reduce payload size
      const prototypeData = extractPrototypeData(figmaData);

      // Prepare the prompt for Mistral AI
      const prompt = `You are analyzing Figma design data to generate automated test cases for prototype interactions.

CRITICAL REQUIREMENTS:
1. Each test case MUST include ALL 6 components in this exact order:
   <Test Case Name>,CLICK/CLICK_COORDS,coordinates/text,SLEEP,duration,CHECK,expected_text

2. CORRECT Test Case Format Examples:
   Navigate from Splash to Popular,CLICK_COORDS,540,960,SLEEP,2,CHECK,POPULAR RECIPES
   Navigate from Popular to Menu,CLICK_COORDS,74,83,SLEEP,2,CHECK,EXIT
   Navigate from Menu to Favorite,CLICK,FAVORITE RECIPES,SLEEP,2,CHECK,FAVORITE RECIPES

3. Command Rules:
   - CLICK_COORDS: Use for clickable areas without text. Format: CLICK_COORDS,x,y (where x,y are POSITIVE numbers)
   - CLICK: Use for buttons/text elements. Format: CLICK,TEXT_TO_CLICK
   - SLEEP: Always use SLEEP,2 (2 seconds wait)
   - CHECK: Verify destination screen text in UPPER CASE

4. MANDATORY Coordinate Guidelines:
   - Screen size: 1080 x 1920 pixels (width x height)
   - Top-left corner is (0,0)
   - Center coordinates: (540,960)
   - Menu button coordinates: (74,83)
   - ALL COORDINATES MUST BE POSITIVE NUMBERS ONLY
   - NEVER use negative coordinates like (-1295,-134) - this is WRONG
   - Valid coordinate range: X: 0-1080, Y: 0-1920
   - Examples of CORRECT coordinates: 74,83 or 540,960 or 200,400
   - Examples of WRONG coordinates: -1295,-134 or 1131,-134 (negative numbers are invalid)

5. Navigation Flow Rules:
   - Create sequential navigation paths
   - Navigate FROM source TO destination
   - Then continue FROM that destination to next screen
   - Include back navigation using menu buttons at coordinates like 74,83

6. Text Formatting:
   - ALL text in CLICK and CHECK commands must be UPPER CASE
   - Match exact spelling from Figma data
   - No extra spaces around commas

7. Required Output:
   - Generate test cases that follow complete user journeys
   - Include forward and backward navigation
   - Each line must be a complete test case with all 6 components
   - NO comments, explanations, or additional text
   - ONLY use POSITIVE coordinate values (0-1080 for X, 0-1920 for Y)

Figma Prototype Data:
${JSON.stringify(prototypeData, null, 2)}

Generate complete test cases following the exact format above:`;

      // Make request to configured AI provider
      const apiEndpoint = `${aiConfig.apiUrl.replace(/\/$/, '')}/v1/chat/completions`;
      const aiResponse = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${aiConfig.apiKey}`
        },
        body: JSON.stringify({
          model: aiConfig.model || 'mistral-large-latest',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.3
        })
      });

      if (!aiResponse.ok) {
        const errorData = await aiResponse.json().catch(() => ({}));
        return res.status(500).json({ 
          success: false, 
          message: `AI API Error: ${errorData.message || aiResponse.statusText}` 
        });
      }

      const aiData = await aiResponse.json();
      let testCases = aiData.choices?.[0]?.message?.content;

      if (!testCases) {
        return res.status(500).json({ 
          success: false, 
          message: "No test cases generated by AI" 
        });
      }

      // Post-process to fix any negative coordinates that might slip through
      testCases = testCases.replace(/CLICK_COORDS,-?\d+,-?\d+/g, (match: string) => {
        const coords = match.match(/CLICK_COORDS,(-?\d+),(-?\d+)/);
        if (coords) {
          let x = parseInt(coords[1]);
          let y = parseInt(coords[2]);
          
          // Fix negative coordinates by converting to positive
          if (x < 0) x = Math.abs(x) % 1080;
          if (y < 0) y = Math.abs(y) % 1920;
          
          // Ensure coordinates are within valid range
          x = Math.min(Math.max(x, 0), 1080);
          y = Math.min(Math.max(y, 0), 1920);
          
          // Use common defaults for typical UI elements
          if (x === 0 && y === 0) {
            x = 540; // Center
            y = 960;
          }
          
          return `CLICK_COORDS,${x},${y}`;
        }
        return match;
      });

      res.json({ 
        success: true, 
        testCases: testCases.trim(),
        message: "Test cases generated successfully" 
      });

    } catch (error) {
      console.error('Test case generation error:', error);
      res.status(500).json({ 
        success: false, 
        message: `Error generating test cases: ${error instanceof Error ? error.message : String(error)}` 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
