import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {SiteHeader} from "@/components/site-header";
import {get_me} from "@/services/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const {data} = await get_me()
    if(!data?.account?.email){
        return redirect("/");
    }
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset"/>
            <SidebarInset className={"bg-[#f5f5f5]"}>
                <SiteHeader/>
                <div className={"p-4 "}>{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
