import { nanoid } from "nanoid";
import { readUsers, writeUsers } from "../utils/fileHelper.js";

const usersRoutes = [
  {
    method: "GET",
    path: "/test",
    handler: async (request, h) => {
      return h
        .response({
          status: "success",
          message: "API is working!",
          timestamp: new Date().toISOString(),
        })
        .code(200);
    },
  },
  {
    method: "POST",
    path: "/users/register",
    handler: async (request, h) => {
      try {
        console.log("Register request received:", request.payload);

        const { name, email, password } = request.payload;

        if (!name || !email || !password) {
          console.log("Missing required fields");
          return h
            .response({
              status: "fail",
              message: "Name, email, dan password harus diisi",
            })
            .code(400);
        }

        const users = await readUsers();
        console.log("Current users count:", users.length);

        const existing = users.find((u) => u.email === email);
        if (existing) {
          console.log("Email already exists:", email);
          return h
            .response({
              status: "fail",
              message: "Email sudah terdaftar",
            })
            .code(400);
        }

        const newUser = {
          id: nanoid(),
          name,
          email,
          password,
          createdAt: new Date().toISOString(),
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
            message: "Registrasi berhasil",
            data: userResponse,
          })
          .code(201);
      } catch (err) {
        console.error("Register error:", err);
        return h
          .response({
            status: "error",
            message: "Terjadi kesalahan server",
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
        console.log("Login request received:", {
          email: request.payload?.email,
        });

        const { email, password } = request.payload;

        if (!email || !password) {
          console.log("Missing email or password");
          return h
            .response({
              status: "fail",
              message: "Email dan password harus diisi",
            })
            .code(400);
        }

        const users = await readUsers();
        console.log("Checking against", users.length, "users");

        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) {
          console.log("Invalid credentials for email:", email);
          return h
            .response({
              status: "fail",
              message: "Email atau password salah",
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
            message: "Login berhasil",
            data: userResponse,
          })
          .code(200);
      } catch (err) {
        console.error("Login error:", err);
        return h
          .response({
            status: "error",
            message: "Terjadi kesalahan server",
          })
          .code(500);
      }
    },
  },
];

export default usersRoutes;
