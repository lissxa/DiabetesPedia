import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const DATA_FILE = path.join(__dirname, "../data/users.json");

const readUsers = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
};

const writeUsers = async (users) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const users = await readUsers();
    return users.find((user) => user.email === email);
  } catch (error) {
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const users = await readUsers();
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    await writeUsers(users);
    return newUser;
  } catch (error) {
    throw error;
  }
};

export default {
  readUsers,
  writeUsers,
  findUserByEmail,
  createUser,
};
