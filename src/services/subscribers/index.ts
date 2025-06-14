"use server"
"use server"
import {cookies} from "next/headers";

const url = process.env.NEXT_SERVER_URL as string || "https://api.nexolance.com/api"
// create subscribers
export const add_new_subscribers_into_group= async (payload:FormData)=>{
    try{
        const token = (await cookies()).get("accessToken")?.value
        const res = await fetch(`${url}/subscriber`, {
            method: "POST",
            headers: {
                "Authorization": token!
            },
            body: payload
        })
        // revalidateTag("group")
        return (await res.json())
    }catch(err){
        console.log(err)
    }
}
export const get_all_subscriber= async (groupId:string)=>{
    try{
        const token = (await cookies()).get("accessToken")?.value
        const res = await fetch(`${url}/subscriber?groupId=${groupId}`, {
            method: "GET",
            headers: {
                "Authorization": token!
            },
        })
        return (await res.json())
    }catch(err){
        console.log(err)
    }
}