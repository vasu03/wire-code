// Importing required modules
import React from "react";

// Importing custom providers
import PlaygroundProvider from "./provider";

// Creating a Layout for Playground page
const PlaygroundLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    // TSX to render the layout
    return (
        <PlaygroundProvider>
            {children}
        </PlaygroundProvider>
    );
};

// Exporting our Layout
export default PlaygroundLayout;