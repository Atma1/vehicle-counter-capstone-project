import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "./ui/skeleton";

export default function TableBodySkeleton() {
    const rowAmmount = 5;
    let i = 0;
    const rowSkeleton = [];
    while (i <= rowAmmount) {
        rowSkeleton.push(
            <TableRow key={i}>
                <TableCell className="font-medium"><Skeleton className="w-full h-[20px] rounded-full" /></TableCell>
                <TableCell className="font-medium"><Skeleton className="w-full h-[20px] rounded-full" /></TableCell>
                <TableCell className="font-medium"><Skeleton className="w-full h-[20px] rounded-full" /></TableCell>
                <TableCell className="font-medium"><Skeleton className="w-full h-[20px] rounded-full" /></TableCell>
                <TableCell className="font-medium"><Skeleton className="w-full h-[20px] rounded-full" /></TableCell>
                <TableCell className="text-right"><Skeleton className="w-full h-[20px] rounded-full" /></TableCell>
            </TableRow>)
        i++;
    }
    return rowSkeleton;
}
