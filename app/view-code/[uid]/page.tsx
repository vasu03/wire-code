"use client";

// Importing required modules
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

// Importing the icons
import { Loader } from "lucide-react";

// Importing custom Data constants
import Constants from "@/data/Constants";

// Importing custom components
import AppHeader from "@/app/_components/AppHeader";
import GenerationDetails from "../_components/GenerationDetails";
import CodeEditor from "../_components/CodeEditor";

// Defining the type of the DataRecord
export interface DataRecord {
    id: number,
    description: string,
    code: any,
    imgUrl: string,
    aiModel: string,
    createdBy: string
};

// Creating a Page to display the generated code for given wireframe
const ViewGeneratedCode = () => {
    // Grab the uid from the url
    const { uid } = useParams();

    // State variable to handle the loading state
    const [loading, setLoading] = useState<boolean>(false);
    // State variable to store the generated code
    const [generatedCode, setGeneratedCode] = useState<string>("");
    // State varibale to store the Data record as fetched from database
    const [dataRecord, setDataRecord] = useState<DataRecord>();
    // State variable to store the status for code generation
    const [isCodeReady, setIsCodeReady] = useState<boolean>(false);

    // function to handle the fetching of generated code data
    const fetchGeneratedCodeData = async () => {
        setLoading(true);

        // Make an API call to fetch the generated code data
        const response = await axios.get(`/api/code-generation?uid=${uid}`);

        // set the obtained data to dataRecord state variable
        setDataRecord(response?.data);

        // check if the code field in obtained data is null
        if (response?.data?.code === null) {
            handleGenerateCode(response?.data);
        } else {
            console.error("No record found");
        }

        // setLoading(false);
    }

    // calling the fetchGeneratedCodeData function under a useEffect hook whenever uid changes
    useEffect(() => {
        if (uid) {
            fetchGeneratedCodeData();
        }
    }, [uid]);

    // function to handle the generation of Code for fetched data
    const handleGenerateCode = async (record: DataRecord) => {
        setLoading(true);
        setIsCodeReady(false);

        // Get the response from the API
        const response = await fetch(`/api/ai-model`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: record?.description + ": " + Constants?.PROMPT,
                aiModel: record?.aiModel,
                imgUrl: record?.imgUrl,
            }),
        });

        if (!response.body) {
            return;
        }
        setLoading(false);

        // Convert the response body to a readable stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const text = (decoder.decode(value));
            // Remove markdown code fence markers like ```jsx, ```tsx, etc.
            const cleanedText = text
                // Remove markdown code fences (with or without a language specifier)
                .replace(/```(jsx|tsx|typescript|javascript|react|js|ts)?\s*/gi, '')
                .replace(/```/g, '')
                // Split the text into individual lines
                .split("\n")
                // Filter out lines that are just language identifiers or junk text
                .filter(line => {
                    const trimmed = line.trim();
                    // Remove lines that exactly match a language keyword
                    if (/^(jsx|tsx|typescript|javascript|react|js|ts)$/i.test(trimmed)) return false;
                    // Remove lines that start with "Static route" (or any other unwanted marker)
                    if (/^Static route/i.test(trimmed)) return false;
                    return true;
                })
                // Join the filtered lines back together
                .join("\n")
                // Trim any extra whitespace from the result
                .trim();

            setGeneratedCode((prev) => prev + cleanedText);
            console.log(text);
        }

        setIsCodeReady(true);
    }

    // TSX to render the page
    return (
        <div>
            <AppHeader hideSidebar={true} />
            <div className="grid grid-cols-1 lg:grid-cols-5 p-4 gap-3">
                {/* Generation Details as provided by user */}
                <div className="col-span-1">
                    <GenerationDetails dataRecord={dataRecord} handleRegenerateCode={() => fetchGeneratedCodeData()} />
                </div>

                {/* Code Editor & preview for generated code */}
                <div className="col-span-4">
                    {loading ? (
                        <div className="h-full flex items-center justify-center rounded-sm bg-gray-50">
                            <h2 className="flex flex-col items-center justify-center gap-4 text-xl text-center text-gray-500">
                                <Loader className="animate-spin" />
                                Processing the wireframe...
                            </h2>
                        </div>
                    ) : (
                        <CodeEditor generatedCode={generatedCode} isCodeReady={isCodeReady} />
                    )}
                </div>
            </div>
        </div>
    );
};

// Exporting the page
export default ViewGeneratedCode;