import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
    theme: { logo: "https://authjs.dev/img/logo-sm.png" },
    providers: [
        GitHub]
});