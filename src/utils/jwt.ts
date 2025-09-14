import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}

export function signToken(payload: object) {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as unknown as number };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

//bcrypt.compare(password, user.password);
export function compareToken(token: string, password: string) {
  return jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return false;
    }
    return bcrypt.compare(password, decoded?.password as string);
  });
}