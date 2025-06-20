import { AppSidebar } from "@/components/app-sidebar";
import TopNav from "@/components/TopNav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import StreamVideoProvider from "@/providers/StreamClientProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Meetly Panel",
    description: "Generated by Usman Zia",
};

export default function PanelLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StreamVideoProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <TopNav />
                    <main className="p-4">{children}</main>
                    <Toaster richColors />
                </SidebarInset>
            </SidebarProvider>
        </StreamVideoProvider>

    );
}
