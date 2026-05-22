import dns from "node:dns/promises";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

dotenv.config();

const uri = process.env.MONGODB_URI || "";
const host = uri.includes("@")
  ? uri.split("@").at(-1).split("/")[0]
  : uri.replace("mongodb://", "").replace("mongodb+srv://", "").split("/")[0];

try {
  if (!uri) {
    throw new Error("MONGODB_URI is missing in backend/.env");
  }

  console.log(`Checking MongoDB host: ${host}`);

  if (uri.startsWith("mongodb+srv://")) {
    const srvHost = `_mongodb._tcp.${host}`;
    console.log(`Checking DNS SRV record: ${srvHost}`);
    await Promise.race([
      dns.resolveSrv(srvHost),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("DNS lookup timed out after 8 seconds")), 8000)
      ),
    ]);
    console.log("DNS lookup succeeded");
  }

  await connectDB();
  console.log("Database check passed");
  process.exit(0);
} catch (error) {
  console.error(`Database check failed: ${error.message}`);
  console.error(
    [
      "If you use MongoDB Atlas:",
      "1. Check username/password in backend/.env.",
      "2. In Atlas, go to Network Access and allow your current IP, or temporarily 0.0.0.0/0 for testing.",
      "3. Make sure the cluster is running.",
      "4. Make sure your internet/DNS can resolve the Atlas host.",
    ].join("\n")
  );
  process.exit(1);
}
