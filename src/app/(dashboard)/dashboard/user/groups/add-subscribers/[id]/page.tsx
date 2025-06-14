/* eslint-disable @typescript-eslint/no-explicit-any */
import AddSubscribersForm from "@/components/add-subscribers-form";


export default async function Page({ params }:{params:any}) {
    const {id} = await params
    const url = process.env.NEXT_SERVER_BASE_URL as string;
    return (
        <div>
            <AddSubscribersForm groupId={id} url={url} />
        </div>
    );
}
