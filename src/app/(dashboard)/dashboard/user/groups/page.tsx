import React from 'react';
import GroupTable from "@/components/group-table";
import {get_all_groups} from "@/services/group";

const Groups = async () => {
    const {data} = await get_all_groups()
    return (
        <div>
            <GroupTable data={data} />
        </div>
    );
};

export default Groups;