/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import RenameGroupForm from "@/components/rename-group-form";

const Page =async ({params}:{params:any}) => {
    const {id} = await params;
    return (
        <div>
            <RenameGroupForm id={id}/>
        </div>
    );
};

export default Page;