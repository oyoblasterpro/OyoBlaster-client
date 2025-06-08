import React from 'react';
import RenameGroupForm from "@/components/rename-group-form";

const Page =async ({params}:{params:{id:string}}) => {
    const {id} = await params;
    return (
        <div>
            <RenameGroupForm id={id}/>
        </div>
    );
};

export default Page;