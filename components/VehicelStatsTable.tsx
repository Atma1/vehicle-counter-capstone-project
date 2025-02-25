import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import VehicleStatsTableBody from "./VehicleStatsTableBody"
import { Suspense } from "react"
import TableBodySkeleton from "./TableBodySkeleton"

export default function VehicelStatsTable() {
    return (
        <Table className="mt-8">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Location</TableHead>
                    <TableHead>Car Count</TableHead>
                    <TableHead>Motorbike Count</TableHead>
                    <TableHead>Truck Count</TableHead>
                    <TableHead>Bus Count</TableHead>
                    <TableHead className="text-right">Timestamp</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <Suspense fallback={<TableBodySkeleton />}>
                    <VehicleStatsTableBody />
                </Suspense>
            </TableBody>
        </Table>
    )
}
