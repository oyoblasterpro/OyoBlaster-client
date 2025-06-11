"use client"
import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {add_new_subscribers_into_group} from "@/services/subscribers";
import {useRouter} from "next/navigation";
import io from "socket.io-client";

const AddSubscribersForm = ({groupId}: { groupId:string}) => {
    const socket = io("http://13.220.206.60");
    useEffect(() => {
        socket.on("subscriber-progress", (data) => {
            if(data?.checked && data?.total){
                toast.loading(`Email checking... ${data?.checked} / ${data?.total}`,{id:1});
            }
        });

        return () => {
            socket.off("subscriber-progress");
        };
    }, [socket]);
    const [file,setFile] = useState<File | null>(null);
    const router = useRouter()
    function downloadFile(type:string) {
        const content = [
            ["Email address", "First name", "Last name"],
            ["charleslkelly@sender.net", "Charles", "Kelly"],
            ["davidlambert@sender.net", "David", "Lambert"],
            ["lucillegentry@sender.net", "Lucille", "Gentry"],
            ["darrellrweiner@sender.net", "Darrell", "Weiner"],
        ];

        let blob;
        let fileName;

        if (type === "csv") {
            const csvContent = content.map(row => row.join(",")).join("\n");
            blob = new Blob([csvContent], {type: "text/csv"});
            fileName = "template.csv";
        } else {
            // Simulate Excel with CSV (or use a real Excel library if needed)
            const excelContent = content.map(row => row.join("\t")).join("\n");
            blob = new Blob([excelContent], {type: "application/vnd.ms-excel"});
            fileName = "template.xls";
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    }

    const handle_upload_subscribers = async () => {
        const id = toast.loading("Subscribing to the server...");
        if(!file){
            toast.error("No file selected", {id});
            return;
        }
        if(!groupId){
            toast.error("Please select a group", {id});
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify({groupId}));

        const res = await add_new_subscribers_into_group(formData);
        if(res?.success){
            toast.success(`${res?.message} - ${res?.data?.valid}/${res?.data?.total} valid`,{id:1});
            router.push("/dashboard/user/groups");
        }else{
            toast.error(res?.message,{id:1});
        }
    }

    return (
        <div className="min-h-[80vh] flex flex-col lg:flex-row items-start justify-center gap-8 p-6 ">
            {/* Upload Box */}
            <div className="w-full h-full lg:w-1/2 p-6 border rounded-lg shadow-sm bg-white">
                <label htmlFor="file" className="block text-lg font-semibold ">
                    Upload subscribers from file
                </label>
                <p className={"text-sm text-gray-500 my-2"}>Choose file from your computer. You can add custom fields to
                    first row.</p>

                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col h-64 items-center justify-center w-full p-6 text-center bg-white border-2 border-dashed border-gray-300 cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl transition hover:bg-gray-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-10 h-10 text-gray-500 dark:text-gray-400 mb-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        />
                    </svg>

                    <h2 className="font-medium text-gray-700 dark:text-gray-200">Choose from your computer</h2>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Supported file types: .csv, MS Excel (.xlsx)
                        Maximum allowed file size is 64MB
                    </p>
                    {
                        file && <p className="mt-1 text-gray-500 dark:text-gray-400">
                            Selected File: <span className={"text-green-600"}>{file?.name}</span>
                        </p>
                    }

                    <input onChange={e=> setFile(e?.target?.files && e?.target?.files[0])} id="dropzone-file" type="file" className="hidden"/>
                </label>
                <div className={"flex justify-end mt-5 items-end"}>
                    <Button onClick={handle_upload_subscribers}>Upload Now</Button>
                </div>
            </div>

            {/* Table Section */}
            <div className="w-full lg:w-1/2 p-6 border rounded-lg shadow-sm bg-white">
                <h2 className="text-lg font-semibold mb-2">List example</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Each subscriber must be in a new row, subscriber fields must be in separate columns
                </p>

                <div className="overflow-auto">
                    <table className="min-w-full border text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-4 py-2 font-semibold">Email address</th>
                            <th className="px-4 py-2 font-semibold">First name</th>
                            <th className="px-4 py-2 font-semibold">Last name</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="border-b">
                            <td className="px-4 py-2">charleslkelly@sender.net</td>
                            <td className="px-4 py-2">Charles</td>
                            <td className="px-4 py-2">Kelly</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2">davidlambert@sender.net</td>
                            <td className="px-4 py-2">David</td>
                            <td className="px-4 py-2">Lambert</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2">lucillegentry@sender.net</td>
                            <td className="px-4 py-2">Lucille</td>
                            <td className="px-4 py-2">Gentry</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2">darrellrweiner@sender.net</td>
                            <td className="px-4 py-2">Darrell</td>
                            <td className="px-4 py-2">Weiner</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        onClick={() => downloadFile("excel")}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Download Excel template
                    </button>
                    <button
                        onClick={() => downloadFile("csv")}
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                    >
                        Download CSV template
                    </button>
                </div>
            </div>
        </div>

    );
};

export default AddSubscribersForm;