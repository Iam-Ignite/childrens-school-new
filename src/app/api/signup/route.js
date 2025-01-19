import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import  User  from "../../../model/User";
import  {connectDB}  from "../../../lib/mongodb";

const SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userName, password } = body;

    console.log("Connecting to the database...");
    await connectDB();



    console.log("Hashing the password...");
    const saltRounds = 10; // Number of hashing rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    console.log("Creating a new user...");
    const newUser = new User({
      userName,
      password: hashedPassword,
    });
    await newUser.save();

    console.log("Generating the JWT...");
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      SECRET,
      { expiresIn: "1h" }
    );

    console.log("Registration successful.");
    return NextResponse.json(
      {
        message: "User registered successfully",
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error.message);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
