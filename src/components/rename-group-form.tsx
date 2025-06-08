"use client"
import React, {useState} from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {toast} from "sonner";
import {update_group_name} from "@/services/group";
import {useRouter} from "next/navigation";

const RenameGroupForm = ({id}:{id:string}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm()

    const handle_rename_group: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true)
        const result = await update_group_name(id,{groupName:data?.groupName})
        if(result?.success){
            setLoading(false)
            toast.success(result?.message)
            reset()
            router.push("/dashboard/user/groups")
        }else{
            setLoading(false)
            toast.error(result?.message)
        }
    }
    return (
        <div className="flex justify-center min-h-[70vh] items-center">
            <form className={"max-w-sm w-full border p-8 rounded-md"} onSubmit={handleSubmit(handle_rename_group)}>
                <h1 className={"text-2xl text-center font-semibold"}>Update Group Name</h1>
                <div className="grid gap-4 mt-5">
                    <div className="grid gap-3">
                        <Label htmlFor="groupName">Group name</Label>
                        <Input
                            id="groupName"
                            placeholder="e.g. Marketing Team"
                            {...register("groupName", {required: "Group name is required"})}
                        />
                        {errors.groupName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.groupName.message as string}
                            </p>
                        )}
                    </div>
                </div>
                <Button type="submit" className={"w-full mt-5"}>
                    {
                        loading?<span className="w-5 h-5 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></span>:
                            "Update Now"
                    }
                </Button>
            </form>
        </div>
    );
};

export default RenameGroupForm;