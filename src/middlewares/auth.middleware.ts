import { RequestHandler } from 'express';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';

import { AUTH_SECRET } from '../utils/config.utils';

export interface AuthPayload {
  id: string;
  username: string;
  isAdmin: boolean;
}

export interface AuthStatus {
  token: string;
  payload: AuthPayload;
}

export function generateJwt(payload: AuthPayload): string {
  return jwt.sign(payload, AUTH_SECRET, { algorithm: 'HS512', expiresIn: '12h' });
}

export const authenticateJwt: RequestHandler<unknown, unknown, unknown, unknown, AuthStatus> = async (
  req,
  res,
  next
) => {
  try {
    const authHeader = req.header('Authorization');
    const token = getAuthHeader(authHeader);

    const decoded = jwt.verify(token, AUTH_SECRET) as JwtPayload;
    const payload = { id: decoded['id'], username: decoded['username'], isAdmin: decoded['isAdmin'] };

    res.locals = { token, payload };

    return next();
  } catch (error) {
    const errMsg = `Auth failed for token`;
    console.error(`${errMsg}: ${error}`);

    if (error instanceof TypeError) {
      return res.status(401).json({ message: 'Authorization header is expected' }).end();
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Token is invalid' }).end();
    }

    return res.status(500).json({ message: 'Internal Server Error' }).end();
  }
};

export const getAuthHeader = (authHeader: string | undefined): string => {
  if (!authHeader) {
    throw new TypeError('Authorization header is expected');
  }
  return authHeader.replace('Bearer ', '').trim();
};
