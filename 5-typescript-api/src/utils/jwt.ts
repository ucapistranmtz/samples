import jwt from 'jsonwebtoken';
interface JwtPayload {
  id: string;
  email: string;
  name: string;
}
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export function generateToken(payload: JwtPayload, expiresIn: jwt.SignOptions['expiresIn'] = '1h') {
  const options: jwt.SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
