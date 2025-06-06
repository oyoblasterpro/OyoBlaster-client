'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "../ui/button";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {send_email} from "@/services/email-sender";

export function UploaderForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [fileName, setFileName] = useState();

    const onSubmit = async (data) => {
            // extract form data
        const formData = new FormData();
        formData.append("file", fileName!);
        formData.append("data", JSON.stringify(data));

        const res = await send_email(formData);
        console.log(res);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file);
        }
    };


    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="text-center text-3xl">Start your Campaign</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        {/* Subject */}
                        <div className="grid gap-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                type="text"
                                placeholder="Your email subject"
                                {...register("subject", {required: "Subject is required"})}
                            />
                            {errors.subject && (
                                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                            )}
                        </div>

                        {/* Text */}
                        <div className="grid gap-2">
                            <Label htmlFor="text">Text</Label>
                            <Input
                                id="text"
                                type="text"
                                placeholder="Your text here"
                                {...register("text", {required: "Text is required"})}
                            />
                            {errors.text && (
                                <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
                            )}
                        </div>

                        {/* File Upload */}
                        <div className="grid gap-2">
                            <Label htmlFor="dropzone-file">Email file (.xlsx)</Label>
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-8 text-gray-500 dark:text-gray-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775
                      5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>
                                <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
                                    Email lists
                                </h2>
                                <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
                                    Upload or drag & drop your file (.xlsx)
                                </p>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    accept=".xlsx"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                            {fileName && (
                                <p className="mt-2 text-sm text-green-600 text-center">Selected File: {fileName.name}</p>
                            )}
                        </div>

                        {/* Custom HTML */}
                        <div className="grid gap-2">
                            <Label htmlFor="html">Custom HTML</Label>
                            <Textarea
                                id="html"
                                rows={12}
                                {...register("html", {required: "Custom HTML is required"})}
                            />
                            {errors.html && (
                                <p className="text-red-500 text-sm mt-1">{errors.html.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 flex justify-end">
                        <Button type="submit" className={"bg-blue-400"}>Start Now</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
