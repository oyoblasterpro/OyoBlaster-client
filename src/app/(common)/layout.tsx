
import Navbar from "@/components/nav-bar";


export default function CommonLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    );
}
