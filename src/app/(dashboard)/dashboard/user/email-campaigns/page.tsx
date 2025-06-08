import EmailCampiigns from "@/components/Email-Campaigns/Email-Campaigns";
import {get_all_campaigns} from "@/services/campaign";

const page = async () => {
    const {data} = await  get_all_campaigns()
  return (
    <div>
      <EmailCampiigns data={data} />
    </div>
  );
};

export default page;
