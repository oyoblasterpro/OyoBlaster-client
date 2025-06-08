"use client"
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import {create_new_group} from "@/services/group";
import React, {useState} from "react";
import {toast} from "sonner";

export function CreateGroupDialog() {
    const [loading, setLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm()

    const handle_create_new_group: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true)
        const result = await create_new_group({groupName:data?.groupName})
        if(result?.success){
            setLoading(false)
            setOpen(false)
            toast.success(result?.message)
            reset()
        }else{
            setLoading(false)
            toast.error(result?.message)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

                <DialogTrigger asChild>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded">
                        Create new group
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">Create new Group</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(handle_create_new_group)}>
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
                                    "Create Now"
                            }
                        </Button>
                    </form>

                </DialogContent>
-
        </Dialog>
    )
}
