import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/index';
import User from '@/database/user.modal';


export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
    }
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
    }


    export async function POST(req,res) {
        try {
            await connectToDatabase();
            const {password,email,name}= await req.json();

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return NextResponse.json({status: 400, message: "User already exists"});
            }

            const hashedPassword = await hashPassword(password);
            const newUser = new User({ username: name, email, password: hashedPassword,role:"user" });

            await newUser.save();
            return NextResponse.json({status: 200, message:"User created successfully"});

        } catch (error) {
            console.error("Login failed", error);
            return NextResponse.json({status: 400 , message: "Invalid login credentials"});
        }
    }
