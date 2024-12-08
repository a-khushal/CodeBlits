import NextAuth, { Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import db from "@repo/db"

interface session extends Session {
    user: {
        email: string
        name: string
        image: string
        uid: string
    }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }: any) {
        const newSession: session = session as session

        if(newSession.user && token.uid) {
            newSession.user.uid = token.uid ?? ""
        }

        return newSession

    },
    async jwt({ token, account }: any) {
        const user = await db.user.findFirst({
            where: {
                sub: account?.providerAccountId ?? ""
            }
        })

        if(user) {
            token.uid = user.id
        }

        return token
    },
    async signIn({ user, account }: any) {
        console.log('SignIn Process Started', { user, account });

        if (account?.provider === "google") {
            const email = user.email;

            if (!email) {
                console.error('Email is missing');
                return false;
            }

            const userInDB = await db.user.findUnique({
                where: { email },
            });

            if (userInDB) {
                console.log('User found in DB:', userInDB);
                return true;
            }

            console.log('User not found in DB. Creating new user.');
            await db.user.create({
                data: {
                    email,
                    name: user.name,
                    sub: account.providerAccountId,
                    image: user.image,
                },
            });

            return true;
        }

        console.error('Unsupported provider:', account?.provider);
        return false;
    }
  }
}

export default NextAuth(authOptions)