// Importing required modules
import { NextRequest, NextResponse } from "next/server";
import {eq} from "drizzle-orm";

// Importing custom Database configs and schemas
import { db } from "@/configs/db";
import { codeGenerationTable } from "@/configs/schema";

// Creating a POST API request handler to submit code-generation data from user into database
export const POST = async (request: NextRequest) => {
    // Destructure the request body
    const { imgUrl, aiModel, description, uid, email } = await request.json();

    // make an API call to insert the request body data into Database
    const result = await db.insert(codeGenerationTable).values({
        uid: uid,
        description: description,
        imgUrl: imgUrl,
        aiModel: aiModel,
        createdBy: email
    }).returning({ id: codeGenerationTable.id });

    return NextResponse.json(result);
};

// Creating a GET API request handler to fetch code-generation data from database
export const GET = async (request: NextRequest) => {
    // Destructure the request url
    const reqUrl = request.url;
    // Create a new request search params
    const searchParams = new URL(reqUrl).searchParams;
    // Get the uid from search params
    const uid = searchParams?.get('uid');

    // If uid is available then fetch the data
    if (uid) {
        const result = await db.select().from(codeGenerationTable).where(
            eq(codeGenerationTable.uid, uid) 
        );
        return NextResponse.json(result[0] || { error: "No record found" });
    }
    // else return a error message
    return NextResponse.json({error: "No record found"}); 
} 