import {  NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../model/User";

const SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userName, password } = body;

    console.log("Connecting to the database...");
    await connectDB();

    console.log("Finding the user...");
    const user = await User.findOne({ userName });
    if (!user) {
      console.log("User not found.");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    console.log("Validating the password...");
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Invalid password.");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    console.log("Generating the JWT...");
    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login successful.");
    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error.message);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
