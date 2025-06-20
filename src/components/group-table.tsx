"use client"

import {CiSearch} from "react-icons/ci";
import {CreateGroupDialog} from "@/components/create-group-dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ChevronDown, CloudDownload, TextCursorInput, Trash2, UserPlus} from "lucide-react";
import Link from "next/link";
import {TGroup} from "@/types";
import {delete_group} from "@/services/group";
import {toast} from "sonner";
import {get_all_subscriber} from "@/services/subscribers";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const GroupTable = ({data}:{data:TGroup[]}) => {

    const handle_delete_group = async (id:string)=>{
        const res = await delete_group(id);
        console.log(res)
        if(res?.success){
            toast.success(res?.message)
        }
        else {
            toast.error(res?.message)
        }
    }

    const download_subscriber = async (groupId: string) => {
        const id = toast.loading("Subscriber data fetching....");

        const res = await get_all_subscriber(groupId);

        if (res?.success) {
            toast.loading("Creating XLSX file...", { id });

            const data = res.data?.subscribers;

            // Convert to worksheet
            const worksheet = XLSX.utils.json_to_sheet(data);

            // Create workbook and append the worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Subscribers");

            // Write the workbook to binary array
            const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            // Save to file
            const blob = new Blob([wbout], { type: 'application/octet-stream' });
            saveAs(blob, 'subscribers.xlsx');

            toast.success("XLSX file downloaded!", { id });
        } else {
            toast.error("Failed to fetch subscribers", { id });
        }
    };

    return (
        <div>
            {/* Search and Actions */}
            <div className="flex justify-between items-center mb-4 bg-white p-4">
                <div className="flex items-center gap-2 relative">
                    <input
                        type="text"
                        placeholder="Find campaign by name"
                        className="border p-2 rounded w-64"
                    />
                    <CiSearch className="text-xl absolute top-1/2 -translate-y-1/2 right-3"/>
                </div>
                <div className="flex">
                    <CreateGroupDialog/>
                </div>
            </div>

            {/*    table handle hare  */}
            <Table>
                <TableHeader className="bg-white p-8">
                    <TableRow>
                        <TableHead className="w-[100px]">Group ID</TableHead>
                        <TableHead>Group Name</TableHead>
                        <TableHead>Total Subscribers</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white p-8">
                    {data?.map((gr:TGroup) => (
                        <TableRow key={gr?._id}>
                            <TableCell className="font-medium">{gr?._id}</TableCell>
                            <TableCell>{gr?.groupName}</TableCell>
                            <TableCell>{gr?.totalSubscriber}</TableCell>
                            <TableCell className="text-right flex items-center justify-end gap-2">
                                <Button onClick={()=>download_subscriber(gr?._id)} className={"cursor-pointer"} variant={"outline"}><CloudDownload /></Button>
                                <Button variant={"outline"}>View</Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant={"outline"}>
                                            <ChevronDown />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <Link href={`/dashboard/user/groups/rename/${gr?._id}`}><DropdownMenuItem><TextCursorInput /> Rename</DropdownMenuItem></Link>
                                        <Link href={`/dashboard/user/groups/add-subscribers/${gr?._id}`}><DropdownMenuItem><UserPlus /> Add subscribers</DropdownMenuItem></Link>
                                        <DropdownMenuItem onClick={()=>handle_delete_group(gr?._id)} className={"text-red-600"}><Trash2 className={"text-red-600"} /> Delete Group</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default GroupTable;
