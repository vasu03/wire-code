"use client";

// Importing required modules
import React, { useState } from "react";

// Importing our custom components
import WireframeUpload from "./_components/WireframeUpload";
import ModelSelector from "./_components/ModelSelector";

// Creating the Playground page
const Playground = () => {
    // State varibale to store the Wireframe image
    const [imgFile, setImgFile] = useState<File | null>(null);

    // TSX to render the page
    return (
        <div className="w-full h-fit grid grid-cols-1 xl:grid-cols-2">
            <WireframeUpload setImgFile={setImgFile} />
            <ModelSelector imgFile={imgFile} />
        </div>
    );
};

// Exporting the page
export default Playground;