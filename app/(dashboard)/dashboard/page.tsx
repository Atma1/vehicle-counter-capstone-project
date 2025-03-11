import VehicleStatsTable from "@/components/VehicleStatsTable";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    return (
        <div className="max-w-screen">
            <h1 className="text-4xl font-bold text-center mb-12">Dashboard</h1>
            <VehicleStatsTable />
        </div>
    );
}
