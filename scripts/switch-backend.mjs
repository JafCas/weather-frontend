import readline from "readline";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envLocalPath = path.resolve(__dirname, "../.env.local");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const BACKENDS = [
  {
    name: "Localhost (ws://localhost:3000)",
    url: "ws://localhost:3000",
  },
  {
    name: "Deployed (wss://weather-service-ijfebkkxsa-uc.a.run.app)",
    url: "wss://weather-service-ijfebkkxsa-uc.a.run.app",
  },
];

console.log("\n--- Backend Data Source Selector ---");
BACKENDS.forEach((b, i) => console.log(`${i + 1}) ${b.name}`));

rl.question("\nSelect backend source (1-2): ", (answer) => {
  // This due natural language considerations.
  const index = parseInt(answer) - 1;

  if (index >= 0 && index < BACKENDS.length) {
    const selected = BACKENDS[index];
    console.log(`\nSelected: ${selected.name}`);

    let envContent = "";
    if (fs.existsSync(envLocalPath)) {
      envContent = fs.readFileSync(envLocalPath, "utf8");
    }

    // Check if VITE_WEBSOCKET_URL already exists
    if (envContent.includes("VITE_WEBSOCKET_URL=")) {
      envContent = envContent.replace(
        /VITE_WEBSOCKET_URL=.*/,
        `VITE_WEBSOCKET_URL=${selected.url}`,
      );
    } else {
      envContent += `\nVITE_WEBSOCKET_URL=${selected.url}\n`;
    }

    fs.writeFileSync(envLocalPath, envContent.trim() + "\n");
    console.log(
      `\n✅ Updated .env.local with VITE_WEBSOCKET_URL=${selected.url}`,
    );
  } else {
    console.log("\n❌ Invalid selection. No changes made.");
  }

  rl.close();
});
