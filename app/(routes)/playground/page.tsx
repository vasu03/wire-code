// Importing required modules
import React from "react";

// Importing our custom components
import WireframeUpload from "./_components/WireframeUpload";
import ModelSelector from "./_components/ModelSelector";
import { Button } from "@/components/ui/button";

// Creating the Playground page
const Playground = () => {

    // TSX to render the page
    return (
        <div className="border border-cyan-500 w-full h-fit grid grid-cols-1 xl:grid-cols-2 gap-4">
            <WireframeUpload />
            <ModelSelector />
        </div>
    );
};

// Exporting the page
export default Playground;