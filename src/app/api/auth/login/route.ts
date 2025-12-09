
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnection from "@/src/lib/dbconection";
import User from "@/src/database/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await dbConnection();

        const userFound = await User.findOne({ email: credentials.email });

        if (!userFound) {
          throw new Error("Credenciales inválidas");
        }

        const isMatch = credentials.password === userFound.password;

        if (!isMatch) {
          throw new Error("Contraseña incorrecta");
        }

        return {
          id: userFound._id.toString(),
          name: userFound.name,
          email: userFound.email,
          role: userFound.role, 
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || token.sub;
        token.role = user.role; 
      }
      return token;
    },

    async session({ session, token }) {
      console.log("JWT", token)
      if (session.user) {
        session.user._id = token.id as string;
        session.user.role = token.role; 
      }
      console.log("Session", session);
      return session;
    }
  }
});

export { handler as GET, handler as POST };
