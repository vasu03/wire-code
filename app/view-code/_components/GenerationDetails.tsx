//  Impoorting required mdules
import React from "react";
import Image from "next/image";

// Importing custom data type
import { DataRecord } from "../[uid]/page";

// Importing custom data constants
import Constants from "@/data/Constants";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface GenerationDetailsProps {
    dataRecord?: DataRecord;
}

// Creating a component to show Code generation details as specified by user
const GenerationDetails = ({ dataRecord, handleRegenerateCode }:any ) => {
    // Get the list of all AI Models available
    const AiModelList = Constants?.AIModelsList;

    // TSX to render the component
    return dataRecord && (
        <div className="bg-gray-50 flex flex-col gap-2 items-start p-4 h-[768px] w-full rounded-sm">
            <h2 className="font-medium text-base text-gray-600">Wireframe image:</h2>
            <Image src={dataRecord.imgUrl} alt="wireframe-img" width={300} height={400} className="rounded-lg object-contain w-full" />
            <h2 className="font-medium text-base text-gray-600 mt-4">Selected AI model:</h2>
            <span className="capitalize text-sm text-gray-700">{AiModelList.find((item) => item.value === dataRecord?.aiModel)?.name || "Not Available"}</span>
            <h2 className="font-medium text-base text-gray-600 mt-4">Description:</h2>
            <span className="text-sm text-gray-700">{dataRecord?.description}</span>
            <Button onClick={handleRegenerateCode} variant={"default"} size={"sm"} className="w-full my-4"><RefreshCcw /> Regenerate Code</Button>
        </div>
    );
};

// Exporting the component
export default GenerationDetails;