"use server"

import { signIn, signOut, auth } from '@/app/auth';
import { redirect } from 'next/navigation';

export const login = async () => {
    await signIn();
    redirect('/dashboard');
};

export const logout = async () => await signOut({ redirectTo: '/' });

export const authenticated = async () => {
    const session = await auth();
    if (session) {
        return true;
    } else {
        return false;
    }
}