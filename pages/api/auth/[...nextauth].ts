import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember me', type: 'checkbox' },
      },
      async authorize(credentials, req) {
        const api = process.env.API_URL;
        const { email, password } = credentials as any;
        const res = await fetch(`${api}/auth/sign-in`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 60,
  },

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      const api = process.env.API_URL;
      // Check if the token has expired or is about to expire (e.g., within 5 minutes)
      const tokenExpired = Date.now() > ((token?.exp || 0) as number) * 1000;
      const tokenExpiringSoon =
        ((token?.exp || 0) as number) * 1000 - Date.now() < 5 * 60 * 1000;

      // If the token has expired or is about to expire, refresh it
      if (tokenExpired || tokenExpiringSoon) {
        const refreshedToken = await fetch(`${api}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: token.refreshToken }),
        }).then((res) => res.json());

        // Update the token with the refreshed token values
        if (refreshedToken) {
          return { ...token, ...refreshedToken };
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },

    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
};

export default NextAuth(authOptions);
