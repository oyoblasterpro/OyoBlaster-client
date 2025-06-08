import React from 'react';
import CreateNewCampaignForm from "@/components/create-new-campaign-form";
import {get_all_groups} from "@/services/group";

const Page = async () => {
    const {data} = await get_all_groups()

    return (
        <div>
            <CreateNewCampaignForm groups={data}/>
        </div>
    );
};

export default Page;