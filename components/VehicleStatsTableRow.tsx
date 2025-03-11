import getAllVehicleStats, { VehicleStatsResponse } from "@/actions/getAllVehiceStats";
import { TableRow, TableCell } from "./ui/table";

const convertDate = (date: string) => {
    const dateClass = new Date(date);
    return dateClass.toLocaleString();
}

export default async function VehicleStatsTableRow() {
    const res: VehicleStatsResponse[] = await getAllVehicleStats();

    if (res.length == 0) return "Empty";

    return (
        res.map((dataValue) => (
            <TableRow key={dataValue.count_id}>
                <TableCell className="font-medium">{dataValue.location}</TableCell>
                <TableCell className="font-medium">{dataValue.car_count}</TableCell>
                <TableCell className="font-medium">{dataValue.motorbike_count}</TableCell>
                <TableCell className="font-medium">{dataValue.truck_count}</TableCell>
                <TableCell className="font-medium">{dataValue.bus_count}</TableCell>
                <TableCell className="text-right">{convertDate(dataValue.timestamp)}</TableCell>
            </TableRow>
        ))
    )
}
