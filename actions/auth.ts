"use server"

import { signIn, signOut } from '@/app/auth';

export const login = async (providerId: string) => signIn(providerId, { redirectTo: '/dashboard' });

export const logout = async () => await signOut({ redirectTo: '/' });