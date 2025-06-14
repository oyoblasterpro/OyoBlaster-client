import EmailCampiigns from "@/components/Email-Campaigns/Email-Campaigns";
import {get_all_campaigns} from "@/services/campaign";

const page = async () => {
    const {data} = await  get_all_campaigns()
    const url = process.env.NEXT_SERVER_BASE_URL as string;
  return (
    <div>
      <EmailCampiigns data={data} url={url} />
    </div>
  );
};

export default page;
