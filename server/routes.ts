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
      const { figmaData } = req.body;
      
      if (!figmaData) {
        return res.status(400).json({ 
          success: false, 
          message: "Figma data is required" 
        });
      }

      const mistralApiKey = process.env.MISTRAL_API_KEY;
      if (!mistralApiKey) {
        return res.status(500).json({ 
          success: false, 
          message: "Mistral API key not configured" 
        });
      }

      // Extract only relevant prototype data to reduce payload size
      const prototypeData = extractPrototypeData(figmaData);

      // Prepare the prompt for Mistral AI
      const prompt = `The uploaded data contains Figma design information with prototype interactions. Your task is to:

Objective:
- Parse this data and extract all prototype interactions between frames or components.
- For each interaction, generate a test case in the required format.
- The goal is to validate the user flow from source node to destination node using Figma's prototype definitions.

Test Case Requirements:

1. Test Case Format (1 line per test case):
Each test case line should include:
<Test Case Name>, CLICK or CLICK_COORDS, SLEEP, <duration>, CHECK, <expected_text>

2. Commands Supported:
- CLICK: Clicks on elements with visible text. Example: CLICK, OK
- CLICK_COORDS: Clicks on specific screen coordinates if text is not present.
- SLEEP: Waits for a few seconds. Example: SLEEP, 2
- CHECK: Verifies that specific text appears after interaction.

3. Rules:
- For elements without visible text, use CLICK_COORDS, x, y.
- The coordinates should be according to the page of size 1080 X 1920 and top left of the page is 0,0
- For screens navigated via prototype links, verify the destination screen using CHECK.
- The text after CHECK and CLICK commands should be in upper case.
- Spellings of the text should exactly match the text in data.
- Make these test cases in sequence like navigate from source page to destination then start from destination page to some other page etc.
- Avoid extra spaces after commands.
- There should be no comment only the test cases should be in the file

Expected output format:
Navigate from Splash to Home,CLICK_COORDS,540,960,SLEEP,2,CHECK,POPULAR RECIPES
Navigate from Home to Menu,CLICK_COORDS,74,83,SLEEP,2,CHECK,POPULAR RECIPES

Figma Prototype Data:
${JSON.stringify(prototypeData, null, 2)}

Generate only the test cases in the specified format, no additional text or comments.`;

      // Make request to Mistral AI
      const mistralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mistralApiKey}`
        },
        body: JSON.stringify({
          model: 'mistral-large-latest',
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

      if (!mistralResponse.ok) {
        const errorData = await mistralResponse.json().catch(() => ({}));
        return res.status(500).json({ 
          success: false, 
          message: `Mistral AI Error: ${errorData.message || mistralResponse.statusText}` 
        });
      }

      const mistralData = await mistralResponse.json();
      const testCases = mistralData.choices?.[0]?.message?.content;

      if (!testCases) {
        return res.status(500).json({ 
          success: false, 
          message: "No test cases generated by AI" 
        });
      }

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
