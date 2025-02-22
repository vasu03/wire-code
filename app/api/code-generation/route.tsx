// Importing required modules
import { NextRequest, NextResponse } from "next/server";

// Importing custom Database configs and schemas
import { db } from "@/configs/db";
import { codeGenerationTable } from "@/configs/schema";

export const POST = async (request: NextRequest) => {
    // Destructure the request body
    const { imgUrl, aiModel, description, uid, email } = await request.json();
    console.log(imgUrl, aiModel, description, uid, email);

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