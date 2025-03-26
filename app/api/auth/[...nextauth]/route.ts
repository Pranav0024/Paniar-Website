// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import externalAuthOptions from "@/lib/configs/auth/authOptions";

const handler = NextAuth(externalAuthOptions);

export { handler as GET, handler as POST };