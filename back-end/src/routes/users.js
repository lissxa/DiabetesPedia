import { nanoid } from "nanoid";
import { readUsers, writeUsers } from "../utils/fileHelper.js";

const usersRoutes = [
  {
    method: "GET",
    path: "/test",
    handler: async (request, h) => {
      try {
        const users = await readUsers();
        return h
          .response({
            status: "success",
            message: "API is working!",
            timestamp: new Date().toISOString(),
            userCount: users.length,
            environment: process.env.NODE_ENV || "development",
          })
          .code(200);
      } catch (error) {
        return h
          .response({
            status: "error",
            message: "Server connection failed",
            timestamp: new Date().toISOString(),
          })
          .code(500);
      }
    },
  },
  {
    method: "POST",
    path: "/users/register",
    handler: async (request, h) => {
      try {
        console.log("Register request received");

        const { name, email, password, reEnterPassword } =
          request.payload || {};

        if (!name?.trim() || !email?.trim() || !password?.trim()) {
          return h
            .response({
              status: "fail",
              message:
                "Name, email, and password are required and cannot be empty",
            })
            .code(400);
        }

        if (password !== reEnterPassword) {
          return h
            .response({
              status: "fail",
              message: "Password does not match",
            })
            .code(400);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return h
            .response({
              status: "fail",
              message: "Please provide a valid email address",
            })
            .code(400);
        }

        if (password.length < 6) {
          return h
            .response({
              status: "fail",
              message: "Password must be at least 6 characters long",
            })
            .code(400);
        }

        const users = await readUsers();
        console.log("Current users count:", users.length);

        const existingUser = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (existingUser) {
          console.log("Email already exists:", email);
          return h
            .response({
              status: "fail",
              message: "Email is already registered",
            })
            .code(409);
        }

        const newUser = {
          id: nanoid(),
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        users.push(newUser);
        await writeUsers(users);

        console.log("New user registered:", {
          id: newUser.id,
          email: newUser.email,
        });

        const userResponse = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
        };

        return h
          .response({
            status: "success",
            message: "Registration successful",
            data: userResponse,
          })
          .code(201);
      } catch (err) {
        console.error("Register error:", err);
        return h
          .response({
            status: "error",
            message: "Internal server error occurred during registration",
          })
          .code(500);
      }
    },
  },
  {
    method: "POST",
    path: "/users/login",
    handler: async (request, h) => {
      try {
        console.log("Login request received");

        const { email, password } = request.payload || {};

        if (!email?.trim() || !password?.trim()) {
          return h
            .response({
              status: "fail",
              message: "Email and password are required",
            })
            .code(400);
        }

        const users = await readUsers();
        console.log("Checking against", users.length, "users");

        const user = users.find(
          (u) =>
            u.email.toLowerCase() === email.toLowerCase().trim() &&
            u.password === password
        );

        if (!user) {
          console.log("Invalid credentials for email:", email);
          return h
            .response({
              status: "fail",
              message: "Invalid email or password",
            })
            .code(401);
        }

        console.log("Login successful for user:", user.email);

        const userResponse = {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        };

        return h
          .response({
            status: "success",
            message: "Login successful",
            data: userResponse,
          })
          .code(200);
      } catch (err) {
        console.error("Login error:", err);
        return h
          .response({
            status: "error",
            message: "Internal server error occurred during login",
          })
          .code(500);
      }
    },
  },
  {
    method: "GET",
    path: "/users",
    handler: async (request, h) => {
      try {
        const users = await readUsers();

        const safeUsers = users.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        }));

        return h
          .response({
            status: "success",
            message: "Users retrieved successfully",
            data: safeUsers,
            count: safeUsers.length,
          })
          .code(200);
      } catch (err) {
        console.error("Get users error:", err);
        return h
          .response({
            status: "error",
            message: "Failed to retrieve users",
          })
          .code(500);
      }
    },
  },
];

export default usersRoutes;
