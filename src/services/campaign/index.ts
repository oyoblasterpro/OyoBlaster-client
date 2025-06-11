"use server"
import {cookies} from "next/headers";
import {revalidateTag} from "next/cache";
import {TEmailCampaign} from "@/types";

// const url = process.env.NEXT_SERVER_URL as string
const url = "http://13.220.206.60/api"

// get all campaign
export const get_all_campaigns = async () => {
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${url}/campaign`, {
        method: "GET",
        headers: {
            "Authorization": token!
        },
        next:{
            tags:["campaign"]
        }
    })
    return (await res.json())
}

// create campaign
export const create_campaign = async (payload:Partial<TEmailCampaign>)=>{
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${url}/campaign`, {
        method: "POST",
        headers: {
            "Authorization": token!,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    revalidateTag("campaign")
    return (await res.json())
}

// delete campaign
export const delete_campaign = async (id:string)=>{
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${url}/campaign/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": token!,
        },
    })
    revalidateTag("campaign")
    return (await res.json())
}

// update campaign
export const update_campaign = async (payload:Partial<TEmailCampaign>)=>{
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${url}/campaign`, {
        method: "PATCH",
        headers: {
            "Authorization": token!,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    revalidateTag("campaign")
    return (await res.json())
}

export const start_mailing = async (id:string)=>{
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${url}/campaign/start-mailing/${id}`, {
        method: "POST",
        headers: {
            "Authorization": token!,
        },
    })
    revalidateTag("campaign")
    return (await res.json())
}
