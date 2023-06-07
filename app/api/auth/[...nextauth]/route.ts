import NextAuth, {Session} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import PromptUser, { IPromptUserModel } from '@models/PromptUser';
import { connectToDB } from '@utils/database';


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async session({session}){
      console.log("session route", session);
      // store the user id from MongoDB to session
      const sessionUser: IPromptUserModel | null = await PromptUser.findOne({ email: session.user?.email });
      console.log('sessionUser', sessionUser);

      const updatedSession = {
        ...session,
        user: {
          ...(session.user || {}),
          id: sessionUser?._id.toString() || '',
        },
      };

      return updatedSession;

      // session.user?.id = sessionUser?._id.toString() || '';

      // return session;
    },
    // any is used to solve the error Property 'picture' does not exist on type 'Profile'.""
    async signIn({ account, profile, user, credentials }: any) {
      try {
        await connectToDB();
        console.log("pro", profile);

        // check if user already exists
        const userExists = await PromptUser.findOne({ email: profile?.email });
        console.log("userExists", userExists);

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await PromptUser.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          });
        }

        return true
      } catch (error: any) {
        console.log('Error checking if user exists: ', error?.message || 'Unknown error');
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }