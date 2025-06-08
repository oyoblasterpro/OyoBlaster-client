"use client"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Link from "next/link";
import React, {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {login_user} from "@/services/auth";
import {toast} from "sonner";

export function LoginForm({className, ...props}: React.ComponentProps<"form">) {
    const [loading,setLoading] = useState<boolean>(false);
    const {register,handleSubmit,reset,formState:{errors}} = useForm()
    const router = useRouter()

    // handle register
    const handle_register:SubmitHandler<FieldValues> = async (data) => {
        setLoading(true)
        const payload = {
            email:data?.email,
            password:data?.password
        }
        const result = await login_user(payload)
        if(result?.success){
            toast.success(result?.message)
            setLoading(false)
            reset()
            router.push("/")
        }else {
            toast.error(result?.message)
            setLoading(false)
        }

    }
    return (
        <form onSubmit={handleSubmit(handle_register)} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input {...register("email", {required:true})} id="email" type="email" placeholder="m@example.com"/>
                    {errors.email && <p className={"text-red-600 text-xs"}>Email Required</p>}
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="/forget-password"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input {...register("password", {required:true})} id="password" type="password"/>
                    {errors.email && <p className={"text-red-600 text-xs"}>Email Required</p>}
                </div>
                <Button type="submit" className="w-full">
                    {
                        loading?<span className="w-5 h-5 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></span>:
                            "Login"
                    }
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </form>
    )
}
