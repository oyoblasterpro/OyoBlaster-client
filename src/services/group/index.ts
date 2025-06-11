"use server"
import {cookies} from "next/headers";
import {revalidateTag} from "next/cache";

// const url = process.env.NEXT_SERVER_URL as string
const url = "https://api.nexolance.com/api"
// create new group
export const create_new_group = async (payload:{groupName:string}) => {
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${url}/group`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token!
        },
        body:JSON.stringify(payload)
    })
    revalidateTag("group")
    return (await res.json())
}


// get all group
export const get_all_groups = async () => {
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${url}/group`, {
        method: "GET",
        headers: {
            "Authorization": token!
        },
        next:{
            tags:["group"]
        }
    })
    return (await res.json())
}

// get single group
export const get_single_groups = async (id:string) => {
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${url}/group/${id}`, {
        method: "GET",
        headers: {
            "Authorization": token!
        },
    })
    return (await res.json())
}

// update group name
export const update_group_name = async (id:string, payload:{groupName:string}) => {
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${url}/group/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": token!,
            "Content-Type": "application/json",
        },
        body:JSON.stringify(payload)
    })
    revalidateTag("group")
    return (await res.json())
}
// delete group
export const delete_group = async (id:string) => {
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${url}/group/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": token!,
        }
    })
    revalidateTag("group")
    return (await res.json())
}