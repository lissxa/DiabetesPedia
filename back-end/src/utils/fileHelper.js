import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getDataPath = () => {
  if (process.env.NODE_ENV === "production") {
    return path.join("/tmp", "users.json");
  }
  return path.join(__dirname, "../data/users.json");
};

const filePath = getDataPath();
let writeLock = false;

const ensureDirectoryExists = async () => {
  try {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error("Error creating directory:", error);
  }
};

export const readUsers = async () => {
  try {
    await ensureDirectoryExists();
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeUsers([]);
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
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  try {
    writeLock = true;
    await ensureDirectoryExists();

    const tempPath = filePath + ".tmp";
    await fs.writeFile(tempPath, JSON.stringify(users, null, 2));
    await fs.rename(tempPath, filePath);

    console.log(`Successfully wrote ${users.length} users to file`);
  } catch (error) {
    console.error("Error writing users:", error);
    throw error;
  } finally {
    writeLock = false;
  }
};
