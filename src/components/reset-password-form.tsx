"use client"
import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {KeyRound, LockIcon} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Link from "next/link";

const ResetPasswordForm = () => {
    const { register, handleSubmit, formState:{errors} } = useForm()

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        console.log('Sending reset password email to:', data.email)
        // add your submit logic here
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-sm p-6 shadow-md">
                <CardHeader className="flex flex-col items-center gap-2">
                    <LockIcon className="w-10 h-10 text-gray-600 dark:text-gray-300" />
                    <CardTitle className="text-xl font-semibold">Reset Password?</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        Please provide strong password and remember it.
                    </p>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent >
                        <div className="space-y-4">
                            <Label htmlFor="password">New Password</Label>
                            <div className="relative">
                                <KeyRound  className="absolute w-4 h-4 top-3.5 left-3 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="--------"
                                    className="pl-10"
                                    {...register('password', { required: true })}
                                />
                                {errors && errors.password && <p className={"text-red-600 text-xs"}>Password Required</p>}
                            </div>
                        </div>
                        <div className="space-y-4 mt-6">
                            <Label htmlFor="cnpass">Confirm Password</Label>
                            <div className="relative">
                                <KeyRound className="absolute w-4 h-4 top-3.5 left-3 text-gray-400" />
                                <Input
                                    id="cnpass"
                                    type="password"
                                    placeholder="--------"
                                    className="pl-10"
                                    {...register('confirmPassword', { required: true })}
                                />
                                {errors && errors.confirmPassword && <p className={"text-red-600 text-xs"}>Password Required</p>}
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <div className={"w-full"}>
                            <Button className="w-full mt-8" type="submit">
                                Reset password
                            </Button>
                            <p className={"mt-4 text-center"}>Have password? <Link className={"text-blue-400 hover:underline"} href="/login">Login</Link></p>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default ResetPasswordForm;