"use client";

// Importing required modules
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

// Importing Icons
import { UploadIcon, XIcon } from "lucide-react";

// Importing UI components
import { Button } from "@/components/ui/button";

type WireframeUploadProps = {
    setImgFile: React.Dispatch<React.SetStateAction<File | null>>;
  };
  

// Creating a component to upload the Wireframe image
const WireframeUpload: React.FC<WireframeUploadProps> = ({ setImgFile }) => {
    // State variable to handle the preview-url of selected image file
    const [imgPreviewURL, setImgPreviewURL] = useState<string | null>(null);

    // Function to hanle displaying the preview of selected image
    const handleImgPreview = (e: ChangeEvent<HTMLInputElement>) => {
        // variable to store the selected images
        const imgFiles = e.target.files;

        // convert the selected image into a url format for previewing
        if (imgFiles) {
            // generate a obj-url for the first image selected by user
            const imgURL = URL.createObjectURL(imgFiles[0]);
            // Store the image file in our state
            setImgFile(imgFiles[0]);
            setImgPreviewURL(imgURL);
        }
    };

    // TSX to render the component
    return (
        <section className={`relative w-full flex flex-col h-[480px] md:h-[512px] xl:h-[768px] items-center justify-center gap-4`}>
            {!imgPreviewURL ? (
                <div className="w-[95%] md:w-[85%] h-[75%] flex flex-col items-center justify-center gap-1 rounded-lg shadow-lg">
                    <Button variant={"secondary"} className="h-[65%] w-[85%] md:w-[65%] hover:bg-secondary/60 rounded-xl">
                        <label htmlFor="img-select" className="w-full h-full flex flex-col items-center justify-center gap-2 rounded-lg cursor-pointer">
                            <UploadIcon className="!w-12 !h-12 text-gray-600" />
                            <h3 className="text-lg md:text-xl font-semibold text-gray-600">Upload Image</h3>
                            <p className="text-xs md:text-sm text-center text-gray-500">Click here to upload an image</p>
                            <p className="text-[10px] md:text-xs text-center text-wrap text-gray-500 leading-3">Image must be in .png , .jpeg or .jpg format & less than 1MB</p>
                        </label>
                    </Button>
                    <div className="w-full flex flex-col gap-4 items-center justify-center">
                        <input type="file" multiple={false} onChange={handleImgPreview} id="img-select" className="hidden" />
                    </div>
                </div>
            ) : (
                <div className="relative w-[85%] h-[90%] xl:h-[75%] p-4 flex flex-col justify-center rounded-lg shadow-lg border border-input">
                    <XIcon className="absolute top-2 right-2 w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer" onClick={() => { setImgPreviewURL(null) }} />
                    <Image src={imgPreviewURL} width={520} height={360} className="w-full h-[90%] self-center object-contain" alt="selected wireframe" />
                </div>
            )}
        </section>
    );
};

// Exporting the component
export default WireframeUpload;