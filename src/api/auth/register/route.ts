import { NextRequest, NextResponse} from "next/server";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/db";

export async function POST(request : NextRequest){
    try {
        const {email, password}  = await request.json();
        if(!email || !password){
            return NextResponse.json(
                {error : "Email and password are required"},
                {status : 400}
            )
        }

        await connectToDatabase();
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                {error : "User already exists"},
                {status : 400}
            )
        };

        await User.create({
            email : email,
            password : password
        })

        return NextResponse.json({
            message : "User registration successfull",
            status : 201
        })

    } catch (error) {
        console.log("Error is : ", error)
        return NextResponse.json(
                {error : "Failed to registered User"},
                {status : 500}
            )
    }
}