import Sidebar from "@/components/sidebar";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth();

    // Redirect to login if no session exists
    if (!session) return redirect('/login');

    return (
        <div>
            <Sidebar />
            <div className="ml-80 mr-4 pt-12">
                {children}
            </div>
        </div>
    );
};