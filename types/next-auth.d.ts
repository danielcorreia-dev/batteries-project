import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      nick: string,
      id: number,
      accessToken: string,
      refreshToken: string,
    }
  }
}
