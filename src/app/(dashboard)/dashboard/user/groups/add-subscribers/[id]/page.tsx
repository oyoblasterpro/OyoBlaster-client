/* eslint-disable @typescript-eslint/no-explicit-any */
import AddSubscribersForm from "@/components/add-subscribers-form";


export default async function Page({ params }:{params:any}) {
    const {id} = await params
    return (
        <div>
            <AddSubscribersForm groupId={id} />
        </div>
    );
}
