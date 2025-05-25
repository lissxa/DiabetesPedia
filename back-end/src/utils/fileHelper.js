import fs from "fs/promises";
const filePath = new URL("../data/users.json", import.meta.url);

export const readUsers = async () => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const writeUsers = async (users) => {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
};
