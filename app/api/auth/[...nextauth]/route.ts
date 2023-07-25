import startDb from "@/libs/db";
import userModel from "@/models/userModel";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials,req) {
                const {email, password} = credentials as {
                    email: string;
                    password: string;
                };
                await startDb();

                const user = await userModel.findOne({email});
                if (!user) throw Error(`User not found`);

                const isValidPass = await user.comparePassword(password);
                if (!isValidPass) throw Error(`email or password mismatch!`);

                return {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    id: user._id,
                }
            },
            
        }),
    ],
    callbacks: {
        jwt(params: any) {
            if (params.user?.role) {
                params.token.role = params.user.role;
                params.token.id = params.user.id;
            }

            return params.token;
        },
        session({ session,token }) {
            if (session.user) {
                (session.user as { id: string }).id = token.id as string;
                (session.user as { role: string }).role = token.role as string;
            }

            return session;
        },
    }
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
