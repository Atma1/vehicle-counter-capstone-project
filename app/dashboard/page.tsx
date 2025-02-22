import getAllVehicleStats from "@/actions/getAllVehiceStats";
import VehicelStatsTable from "@/components/VehicelStatsTable";
import { auth } from "@/app/auth";
import { VehicleStatsResponse } from "@/actions/getAllVehiceStats";
import { login } from "@/actions/auth";
export const dynamic = "force-dynamic";

export default async function History() {

    const session = await auth();

    if (!session) await login();

    const res: VehicleStatsResponse[] = await getAllVehicleStats();

    if (res.length == 0) {
        return <h1 className="py-24 px-4 text-4xl font-bold text-center mb-12">No data</h1>
    } else {
        return (
            <div className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-12">History</h1>
                    <VehicelStatsTable data={res} />
                </div>
            </div>
        )
    }
}
