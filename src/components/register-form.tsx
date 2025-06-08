"use client"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Link from "next/link";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import React, {useState} from "react";
import {TRegisterUserPayload} from "@/types";
import {register_new_user} from "@/services/auth";
import {toast} from "sonner";
import {useRouter} from "next/navigation"

export function RegisterForm({className,...props}: React.ComponentProps<"form">) {
    const [loading,setLoading] = useState<boolean>(false);
    const {register,handleSubmit,reset,formState:{errors}} = useForm()
    const router = useRouter()

    // handle register
    const handle_login:SubmitHandler<FieldValues> = async (data) => {
        setLoading(true)
        const payload:TRegisterUserPayload = {
            name:data?.name,
            email:data?.email,
            password:data?.password
        }
        const result = await register_new_user(payload)
        console.log(result)
        if(result?.success){
            toast.success(result?.message)
            setLoading(false)
            reset()
            router.push("/login")
        }else {
            toast.error(result?.message)
            setLoading(false)
        }

    }
    return (
        <form onSubmit={handleSubmit(handle_login)} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Business email</Label>
                    <Input {...register("email", { required: true})} id="email" type="email" placeholder="m@example.com"/>
                    {errors && errors.email && <p className={"text-red-600 text-xs"}>Email Required</p>}
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="name">Organization name</Label>
                    <Input id="name" {...register("name", { required: true})} type="text" placeholder="Example_Hub" />
                    {errors && errors.name && <p className={"text-red-600 text-xs"}>Name Required</p>}
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input {...register("password", { required: true})} id="password" type="password" placeholder="----------" />
                    {errors && errors.password && <p className={"text-red-600 text-xs"}>Password Required</p>}
                </div>
                <Button type="submit" className="w-full">
                    {
                        loading?<span className="w-5 h-5 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></span>:
                            "Register now"
                    }
                </Button>
            </div>
            <div className="text-center text-sm">
                Have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                    Log In
                </Link>
            </div>
        </form>
    )
}
