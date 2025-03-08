import Sidebar from "@/components/sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Sidebar />
            <div className="ml-80 mr-6 pt-12">
                {children}
            </div>
        </div>
    );
};