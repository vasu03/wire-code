"use client";

// Importing required modules
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Importing Firebase service modules
import { auth } from "@/configs/firebaseConfig";
import { signOut } from "firebase/auth";

// Importing custom context providers
import { useAuthContext } from "../provider";

// Importing UI components
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Creating a User Profile Avatar component
const ProfileAvatar = () => {
    // hook to get the authenticated user details
    const user = useAuthContext();

    // hook to perform routing within the app
    const router = useRouter();
    
    // function handle the open/close of Popover component
    const onButtonPress = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            router.replace("/")
        }).catch((error) => {
            // An error happened.
        });
    };

    // TSX to render the component
    return (
        <div>
            <Popover >
                <PopoverTrigger>
                    {user?.user?.photoURL && <img src={user?.user?.photoURL} width={20} height={20} alt="profile" className="w-[35px] h-[35px] rounded-full" />}
                </PopoverTrigger>
                <PopoverContent className="w-[150px] p-0 border border-input flex items-center justify-center relative right-6">
                    <Button variant={"ghost"} onClick={onButtonPress} className="w-full">Logout</Button>
                </PopoverContent>
            </Popover>
        </div>
    );
};

// Exporting the component
export default ProfileAvatar;