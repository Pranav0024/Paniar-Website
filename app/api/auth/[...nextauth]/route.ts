import NextAuth from "next-auth";
import externalAuthOptions from "@/lib/configs/auth/authOptions";

export const handler = NextAuth(externalAuthOptions);
export { handler as GET, handler as POST };
