"use client"

// Importing required modules
import React, { useEffect } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";

// Importing custom providers
import { useAuthContext } from "../provider";

// Importing UI components
import { SidebarProvider } from "@/components/ui/sidebar";

// Importing our custom components
import AppHeader from "../_components/AppHeader";
import AppSidebar from "../_components/AppSidebar";
import PageHeader from "../_components/PageHeader";

// Creating a Provider component for the Playground page
const PlaygroundProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    // Initializing the pre-built hooks
    const user = useAuthContext();
    const router = useRouter();

    // An effect to keep checking if the user is authenticated or not
    useEffect(() => {
        if (!user?.user && user.user) return router.replace("/")

        user?.user && checkUser()
    }, [user]);

    // function to check if the user is available (authenticated) or not
    const checkUser = async () => {
        const result = await axios.post("/api/user", {
            userName: user?.user?.displayName,
            userEmail: user?.user?.email
        });
    }

    // TSX to render the Component
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full flex flex-col border border-red-500">
                <AppHeader />
                <div className="p-8 h-full border border-green-500">
                    <PageHeader title={"Convert your Wireframes into Code"} />
                    {children}
                </div>
            </div>
        </SidebarProvider>
    );
};

// Exporting the component
export default PlaygroundProvider;