"use server"

import { signIn, signOut } from '@/app/auth';

export const login = async () => signIn('', { redirectTo: '/dashboard' });;

export const logout = async () => await signOut({ redirectTo: '/' });