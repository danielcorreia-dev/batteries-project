import { jwtVerify, SignJWT } from 'jose';

interface userJwtPayload {
  jti: string;
  iat: number;
}

export const getJwtSecretKey = async () => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret || secret.length === 0) {
    throw new Error('The environment variable JWT_SECRET_KEY is not set');
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(await getJwtSecretKey())
    );
    return verified.payload as userJwtPayload;
  } catch (error) {
    throw new Error('Your token has expired');
  }
};
