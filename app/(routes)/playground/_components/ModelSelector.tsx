// Importing required modules
import React from "react";
import Image from "next/image";

// Importing UI components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Importing Icons
import { Wand2Icon } from "lucide-react";

// Creating a component to select an AI model to generate the code
const ModelSelector = () => {

    // A List of AI models available to work with
    const AIModelsList = [
        {
            name: "Deepseek R1",
            value: "deepseek",
            icon: "/deepseek.png"
        },
        {
            name: "Google Gemini",
            value: "gemini",
            icon: "/google.png"
        },
        {
            name: "Meta Llama",
            value: "llama",
            icon: "/meta.png"
        }
    ]

    // TSX to render the component
    return (
        <div className="relative flex flex-col md:h-[512px] xl:h-[768px] items-center justify-center gap-4 border border-red-500">
            <div className="w-[85%] h-[75%] px-4 flex flex-col items-center justify-center gap-8">
                <div className="w-[80%] flex flex-col gap-2 ">
                    <span className="text-gray-600 dark:text-gray-300">Select AI model for code generation</span>
                    <Select>
                        <SelectTrigger className="w-full" >
                            <SelectValue placeholder="Choose AI model" />
                        </SelectTrigger>
                        <SelectContent>
                            {AIModelsList.map((item, idx) => ( 
                                <SelectItem value={item.value}>
                                    <span className="flex items-center gap-3">
                                    <Image src={item.icon} width={25} height={25} alt="img" className="" />
                                    <span>{item.name}</span>
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-[80%] flex flex-col gap-2">
                    <span className="text-gray-600 dark:text-gray-300">Enter your Description (optional)</span>
                    <Textarea placeholder="Describe your requirements..." rows={9} className="resize-none" />
                </div>
                <Button>
                    <Wand2Icon />
                    Generate Code
                </Button>
            </div>
        </div>
    );
};

// Exporting the component
export default ModelSelector;