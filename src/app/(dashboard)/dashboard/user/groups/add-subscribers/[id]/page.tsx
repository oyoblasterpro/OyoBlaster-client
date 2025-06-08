import React from 'react';
import AddSubscribersForm from "@/components/add-subscribers-form";
import {get_all_groups} from "@/services/group";

const Page = async ({params}:{params:{id:string}}) => {
    const {id} = await params;
    const {data} = await get_all_groups()
    return (
        <div>
            <AddSubscribersForm groupId={id} groups={data}/>
        </div>
    );
};

export default Page;