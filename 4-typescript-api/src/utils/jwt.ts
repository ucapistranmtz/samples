import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

interface JwtPayload {
  id: string;
  email: string;
  name: string;
}

export function generateToken(payload: JwtPayload, expiresIn: jwt.SignOptions['expiresIn'] = '1h') {
  const options: jwt.SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'id' in decoded &&
      'email' in decoded &&
      'name' in decoded
    ) {
      return decoded as JwtPayload;
    }
    return null;
  } catch {
    return null;
  }
}
