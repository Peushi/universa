import { users } from "../data/store.js";

export async function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  if (users.has(username)) {
    return res.status(409).json({ error: "Username already taken" });
  }

  const newUser = {
    username,
    password, 
    role: "user",
  };

  users.set(username, newUser);

  res.status(201).json({ message: "User registered successfully", username });
}

export async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const user = users.get(username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  req.session.userId = username;
  req.session.role = user.role;

  res.json({ message: "Logged in successfully", username, role: user.role });
}