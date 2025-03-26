import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";

const externalAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

                if (user) {
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (isPasswordCorrect) {
                        return user;
                    }
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.firstname = token.firstname;
                session.user.lastname = token.lastname;
            }
            return session;
        },
        async jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                token.firstname = user.firstname;
                token.lastname = user.lastname;
            }
            return token;
        },
    },
};

export default externalAuthOptions;