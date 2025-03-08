// Importing required modules
import React from "react";

// Importing UI components
import { SidebarTrigger } from "@/components/ui/sidebar";

// Importing custom components
import ProfileAvatar from "./ProfileAvatar";

// Creating a global App header component
const AppHeader = ({ hideSidebar = false }) => {
    // TSX to render the component
    return (
        <div className="p-3 shadow-sm flex items-center justify-between w-full">
            {!hideSidebar && <SidebarTrigger />}
            <ProfileAvatar />
        </div>
    );
};

// Exporting the component
export default AppHeader;