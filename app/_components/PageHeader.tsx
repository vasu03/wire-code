// Importing required modules
import React from "react";

// Defining the types for the props of the component
type PageHeaderProps = {
    title: string;
    subtitle?: string;
};

// Creating a global Header for each page in App
const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
    // TSX to render the component
    return (
        <div className="w-full mb-4">
            {title && (
                <h2 className="text-3xl text-gray-700 dark:text-gray-200 font-semibold">
                    {title}
                </h2>
            )}
            {subtitle && (
                <h3 className="text-base text-gray-700 dark:text-gray-300 font-medium">
                    {subtitle}
                </h3>
            )}
        </div>
    );
};

// Exporting our component
export default PageHeader;