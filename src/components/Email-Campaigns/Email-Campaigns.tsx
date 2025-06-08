"use client"
import {CiFilter, CiSearch} from "react-icons/ci";
import {RiFilter3Line} from "react-icons/ri";
import {TEmailCampaign} from "@/types";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ChevronDown, Send, TextCursorInput, Trash2} from "lucide-react";
import Link from "next/link";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {toast} from "sonner";
import {delete_campaign, start_mailing} from "@/services/campaign";


const EmailCampaigns = ({data}: { data: TEmailCampaign[] }) => {

    const handle_delete_campaign = async (campaignId: string) => {
        const id = toast.loading("Campaign deleting....");
        const res = await delete_campaign(campaignId);
        if (res?.success) {
            toast.success(res?.message, {id});
        } else {
            toast.error(res?.message, {id});
        }
    }

    const handle_start_campaign =async(campaignId: string) => {
        const id = toast.loading("Campaign running... please wait...");
        const res = await start_mailing(campaignId);
        if (res?.success) {
            toast.success(`${res?.message} ${res?.data?.totalMails} / ${res?.data?.totalMails} subscribers`, {id});
        } else {
            toast.error(res?.message, {id});
        }
    }

    return (
        <div className="p-4 bg-white rounded shadow">
            {/* Search and Actions */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 relative">
                    <input
                        type="text"
                        placeholder="Find campaign by name"
                        className="border p-2 rounded w-64"
                    />
                    <CiSearch className="text-xl absolute top-1/2 -translate-y-1/2 right-3"/>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1 border px-4 py-2 rounded">
                        <CiFilter/>
                        Filter
                    </button>
                    <button className="border flex items-center gap-1 px-4 py-2 rounded">
                        <RiFilter3Line/>
                        Sort
                    </button>
                    <Link href="/dashboard/user/email-campaigns/create"
                          className="bg-orange-500 text-white px-4 py-2 rounded">
                        New campaign
                    </Link>
                </div>
            </div>

            {/* Table */}

            <Table>
                <TableHeader className="bg-white p-8">
                    <TableRow>
                        <TableHead className="w-[100px]">Created</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Group</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white p-8">
                    {data?.map((campaign: TEmailCampaign) => (
                        <TableRow key={campaign?._id}>
                            <TableCell
                                className="font-medium">{new Date(campaign?.createdAt).toDateString()}</TableCell>
                            <TableCell> {campaign?.subject}</TableCell>
                            <TableCell> {campaign?.groupId?.groupName}</TableCell>
                            <TableCell> {campaign?.isDelivered ? "Delivered" : "Pending"}</TableCell>
                            <TableCell className="text-right flex items-center justify-end gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">View</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-lg">
                                        <div className={"space-y-2"}>
                                            <h1 className={"text-xl font-semibold"}>Subject - {campaign?.subject}</h1>
                                            <h1 className={"text-gray-500"}>Text - {campaign?.text}</h1>
                                            <h1 className={"text-gray-500"}>Body -</h1>
                                        </div>
                                        <div
                                            className="mt-2"
                                            dangerouslySetInnerHTML={{__html: campaign?.html || ""}}
                                        />
                                    </DialogContent>
                                </Dialog>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant={"outline"}>
                                            <ChevronDown/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <Link href={`/dashboard/user/groups/rename/${campaign?._id}`}><DropdownMenuItem><TextCursorInput/>Edit
                                            campaign</DropdownMenuItem></Link>
                                        <DropdownMenuItem
                                            onClick={() => handle_start_campaign(campaign?._id)}><Send/> Start Campaign</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handle_delete_campaign(campaign?._id)}
                                                          className={"text-red-600"}><Trash2
                                            className={"text-red-600"}/> Delete campaign</DropdownMenuItem>
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

export default EmailCampaigns;
