"use client";
import NextAuth from 'next-auth';
import GoogleProvider from  'next-auth/providers/google';
import { connectToDB } from '../../../utils/database';
import User from '../../../models/UsersModel';
import { signIn } from 'next-auth/react'


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: '742488539838-2qbmsf9vhss8kdoid7igr7kg6fvnjfio.apps.googleusercontent.com',
            ClientSecret: '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',
        })
    ],
    callbacks: {
        async session({session}){
            const sessionUser = await User.findOne({ email: session.user.email });
          session.user.id = sessionUser._id.toString();
    
          return session;
        },
        async signIn({ profile}) {
            try{
                await connectToDB();
                const userExits = await User.findOne({
                    email: profile.email
                });
                if(!userExits)
                {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    })
                }
                return true;
            }
            catch(error) {
                console.log(error);
                return false;
            }
        },
    }
    
})
export { handler as GET, handler as POST }