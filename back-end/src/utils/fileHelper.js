import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../data/users.json");

let writeLock = false;

export const readUsers = async () => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(filePath, JSON.stringify([], null, 2));
      return [];
    }
    console.error("Error reading users:", error);
    return [];
  }
};

export const writeUsers = async (users) => {
  if (!Array.isArray(users)) {
    throw new Error("Data to be written must be an array");
  }

  while (writeLock) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  try {
    writeLock = true;
    const tempPath = filePath + ".tmp";
    await fs.writeFile(tempPath, JSON.stringify(users, null, 2));
    await fs.rename(tempPath, filePath);
  } finally {
    writeLock = false;
  }
};
