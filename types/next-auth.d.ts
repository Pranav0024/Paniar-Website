// @types\next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            firstname: string;
            lastname: string
        } & DefaultSession['user'];
    }
}