"use server"

const url = process.env.NEXT_SERVER_URL as string

export const send_email = async (payload) => {
    const res = await fetch(url + "/mail", {
        method: "POST",
        body: payload,
    })
    return (await res.json())
}