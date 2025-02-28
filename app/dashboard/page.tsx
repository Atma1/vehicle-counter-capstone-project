import VehicleStatsTable from "@/components/VehicleStatsTable";
import { auth } from "@/app/auth";
import { login } from "@/actions/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    // Get authentication session
    const session = await auth();

    // Redirect to login if no session exists
    if (!session) {
        await login();
        redirect('/login'); // Add explicit redirect for better flow control
    }

    return (
        <main className="py-36 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12">Dashboard</h1>
                <VehicleStatsTable />
            </div>
        </main>
    );
}
