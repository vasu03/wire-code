"use client";

// Importing required modules
import React from "react";

// Importing Firebase service modules
import { auth } from "@/configs/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Creating a Wrapper component for Google Auth Service
const Authentication = ({ children }: any) => {
    // Initialising a new Provider Object of Firebase Google Auth service
    const provider = new GoogleAuthProvider();

    // function to handle 
    const onButtonPress = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential: any = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user"s account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    // TSX to render the component
    return (
        <div>
            <div onClick={onButtonPress}>
                {children}
            </div>
        </div>
    );
};

// Exporting the component
export default Authentication;