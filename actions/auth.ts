"use server"

import { signIn, signOut } from '@/auth';

export const login = async (providerId: string) => signIn(providerId, { redirectTo: '/dashboard' });

export const logout = async () => await signOut({ redirectTo: '/' });