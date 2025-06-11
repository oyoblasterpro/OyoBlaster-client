"use server"

import {ResetPasswordPayload, TChangePasswordPayload, TRegisterUserPayload} from "@/types";
import {cookies} from "next/headers";

// const url = process.env.NEXT_SERVER_URL as string
const url = "http://13.220.206.60/api"

export const register_new_user = async (payload: TRegisterUserPayload) => {
    const res = await fetch(url + "/auth/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        }
    );
    return (await res.json())
}

export const login_user = async (payload: {email:string,password:string}) => {
    console.log("my url",url)
    const res = await fetch(url + "/auth/login",
        {
            headers:{
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(payload)
        }
    );
    const result = await res.json();
    if (result?.success) {
        (await cookies()).set("accessToken", result.data.accessToken);
    }
    return result;
}

export const get_me = async () => {
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(url + "/auth/me",
        {
            headers: {
                "Authorization": token!,
            }
        }
    )
    return (await res.json())
}

export const change_password = async (payload:TChangePasswordPayload) => {
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(url + "/auth/change-password",
        {
            method: "POST",
            headers: {
                "Authorization": token!,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        }
    )
    return (await res.json())
}

export const forget_password = async (payload:{email:string}) => {
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(url + "/forgot-password",
        {
            method: "POST",
            headers: {
                "Authorization": token!,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        }
    )
    return (await res.json())
}

export const rest_password = async (payload:ResetPasswordPayload) => {
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(url + "/reset-password",
        {
            method: "POST",
            headers: {
                "Authorization": token!,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        }
    )
    return (await res.json())
}