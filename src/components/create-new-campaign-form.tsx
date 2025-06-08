"use client"
import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Controller, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import { Select, SelectValue } from '@radix-ui/react-select';
import {SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {TGroup} from "@/types";
import { useRef } from 'react';
import {EditorRef, EmailEditor} from "react-email-editor";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {create_campaign} from "@/services/campaign";
import {useRouter} from "next/navigation";

const CreateNewCampaignForm = ({groups}:{groups:TGroup[]}) => {
    const {register,handleSubmit, formState:{errors},control} = useForm();
    const router = useRouter()
    const emailEditorRef = useRef<EditorRef>(null);

    const exportHtml = (): Promise<string> => {
        return new Promise((resolve) => {
            const unlayer = emailEditorRef.current?.editor;
            unlayer?.exportHtml((data) => {
                const { html } = data;
                resolve(html);
            });
        });
    };


    const handle_create_campaign:SubmitHandler<FieldValues> =async (data) => {
        const id = toast.loading("Creating new campaign...");
        const html = await exportHtml()

        const payload ={
            groupId:data?.groupId,
            subject:data?.subject,
            text:data?.text,
            html
        }

        const res = await create_campaign(payload)
        if(res.success){
            toast.success(res?.message,{id});
            router.push("/dashboard/user/email-campaigns")
        }
        else {
            toast.error(res?.message,{id});
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit(handle_create_campaign)} className="max-w-7xl mx-auto border p-4 bg-white shadow rounded-lg">
                <h1 className={"text-4xl text-center mt-4 mb-12 font-semibold"}>Create a new Campaign</h1>
                <div className={"flex justify-between items-center gap-8"}>
                    <div className="grid gap-3 w-full">
                        <Label htmlFor="subject">Email Subject</Label>
                        <Input
                            id="subject"
                            placeholder="Summer offer"
                            {...register("subject", {required: "Email subject is required"})}
                        />
                        {errors.subject && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.subject.message as string}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-3 w-full">
                        <Label htmlFor="text">Email Text</Label>
                        <Input
                            id="text"
                            placeholder="10% exclusive offer."
                            {...register("text", {required: "Text is required"})}
                        />
                        {errors.text && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.text.message as string}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-3 w-full">
                        <Label htmlFor="groupId">Select Group</Label>
                        <Controller
                            name="groupId"
                            control={control}
                            rules={{ required: "Group is required" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {groups?.map((group: TGroup) => (
                                            <SelectItem key={group._id} value={group._id}>
                                                {group.groupName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.groupId && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.groupId.message as string}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-4">
                    <Label htmlFor="editor">Customize Template</Label>
                    <EmailEditor ref={emailEditorRef}/>
                </div>

                <div className={"flex justify-end mt-8"}>
                    <Button type={"submit"}>Create Now</Button>
                </div>
            </form>
        </div>
    );
};

export default CreateNewCampaignForm;