// Importing required modules
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import uuid4 from "uuid4";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Importing custom context providers
import { useAuthContext } from "@/app/provider";

// Importing custom firebase configs
import { storage } from "@/configs/firebaseConfig";

// Importing custom data constants
import Constants from "@/data/Constants";

// Importing UI components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Importing Icons
import { Loader2, Wand2Icon } from "lucide-react";

// Defining the props for the ModelSelector component
type ModelSelectorProps = {
    imgFile: File | null;
};

// Creating a component to select an AI model to generate the code
const ModelSelector: React.FC<ModelSelectorProps> = ({ imgFile }) => {
    // Get the current user information
    const { user } = useAuthContext();
    // Hook to navigate through the app
    const router = useRouter();

    // A List of AI models available to work with
    const AIModelsList = Constants?.AIModelsList;

    // State variable to store the name of selected AI model
    const [aiModel, setAiModel] = useState<string>();
    // State variable to store the extra description for code generation
    const [genDescription, setGenDescription] = useState<string>();
    // State variable to store the loading status
    const [loading, setLoading] = useState<boolean>(false);

    // function to handle the code generation action
    const handleCodeGeneration = async () => {
        if (!imgFile) {
            console.error("No image file selected.");
            return;
        } else if (!aiModel) {
            console.error("No AI model selected.");
            return;
        } else if (!genDescription) {
            console.error("No description provided.");
            return;
        }

        // set the loading status to true to indicate that the code generation is in progress
        setLoading(true);

        try {
            // upload the image file to Firebase storage
            const fileName = Date.now().toString() + "_" + imgFile.name;
            const imageRef = ref(storage, "WireCode/" + fileName);
            await uploadBytes(imageRef, imgFile);
            console.log("File uploaded successfully!");

            // Get the image download url from firebase storage
            const imageUrl = await getDownloadURL(imageRef);

            // Generate a unique id
            const generatedUid = uuid4()

            // Save the data into Database
            const response = await axios.post("/api/code-generation", {
                uid: generatedUid,
                imgUrl: imageUrl,
                aiModel: aiModel,
                description: genDescription,
                email: user?.email
            });

            // set the loading status to false to indicate that the code generation is completed
            setLoading(false);
            // redirect to the view-code page to display the generated code
            router.push(`/view-code/${generatedUid}`);
        } catch (error) {
            setLoading(false);
            console.error("File upload failed:", error);
        }
    };


    // TSX to render the component
    return (
        <section className="relative flex flex-col h-[480px] md:h-[512px] xl:h-[768px] items-center justify-center gap-4">
            <div className="w-[100%] md:w-[90%] h-[75%] px-4 flex flex-col items-center justify-center gap-8 rounded-lg shadow-lg">
                <div className="w-[100%] md:w-[80%] flex flex-col gap-2 ">
                    <span className="text-gray-600 dark:text-gray-300">Select AI model for code generation</span>
                    <Select onValueChange={(value) => setAiModel(value)}>
                        <SelectTrigger className="w-full" >
                            <SelectValue placeholder="Choose AI model" />
                        </SelectTrigger>
                        <SelectContent>
                            {AIModelsList.map((item, idx) => (
                                <SelectItem value={item.value} key={idx}>
                                    <span className="flex items-center gap-3">
                                        <Image src={item.icon} width={25} height={25} alt="img" className="" />
                                        <span>{item.name}</span>
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-[100%] md:w-[80%] flex flex-col gap-2">
                    <span className="text-gray-600 dark:text-gray-300">Enter your Description</span>
                    <Textarea onChange={(e) => setGenDescription(e.target.value)} placeholder="Describe your requirements..." rows={9} className="resize-none" />
                </div>
                <Button onClick={handleCodeGeneration} disabled={loading}>
                    {loading ?
                        (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) :
                        (<><Wand2Icon /><span>Generate Code</span></>)
                    }
                </Button>
            </div>
        </section>
    );
};

// Exporting the component
export default ModelSelector;