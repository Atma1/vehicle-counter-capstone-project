import VehicelStatsTable from "@/components/VehicelStatsTable";
import { auth } from "@/app/auth";
import { login } from "@/actions/auth";
export const dynamic = "force-dynamic";

export default async function History() {

    const session = await auth();

    if (!session) await login();

    return (
        <div className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12">History</h1>
                <VehicelStatsTable />
            </div>
        </div>
    )
}
