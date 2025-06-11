"use server"
"use server"
import {cookies} from "next/headers";
import {revalidateTag} from "next/cache";

// const url = process.env.NEXT_SERVER_URL as string
const url = "http://13.220.206.60/api"
// create subscribers
export const add_new_subscribers_into_group= async (payload:FormData)=>{
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${url}/subscriber`, {
        method: "POST",
        headers: {
            "Authorization": token!
        },
        body: payload
    })
    revalidateTag("group")
    return (await res.json())
}