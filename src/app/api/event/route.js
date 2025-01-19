import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import cloudinary from "../../../lib/cloudinary";
import { Event } from "../../../model/eventSchema";
import streamifier from "streamifier";


// Clou
const uploadToCloudinary = (buffer, mimeType) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "childrens-house/events",
        resource_type: "auto",
        format: mimeType.split('/')[1],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({ secure_url: result?.secure_url || "" });
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};



  
  export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const eventId = searchParams.get("id"); // Extract event ID from query params
      
      if (!eventId) {
        return NextResponse.json(
          { error: "Event ID is required" },
          { status: 400 }
        );
      }
  
      await connectDB();
  
      // Use findById to fetch the event by its ID
      const event = await Event.findById(eventId);
  
      if (!event) {
        return NextResponse.json(
          { error: "Event not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        success: true,
        data: event,
        msg: "Event retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching event:", error);
      return NextResponse.json(
        { error: "Failed to fetch event" },
        { status: 500 }
      );
    }
  }
  

export async function PUT(req) {
    try {
      const formData = await req.formData();
      const eventId = formData.get("eventId");
      
      if (!eventId) {
        return NextResponse.json(
          { error: "Event ID is required" },
          { status: 400 }
        );
      }
  
      await connectDB();
      
      // Find existing event
      const existingEvent = await Event.findById(eventId);
      if (!existingEvent) {
        return NextResponse.json(
          { error: "Event not found" },
          { status: 404 }
        );
      }
  
      // Update text fields if provided
      const headline = formData.get("headline");
      const subHeadline = formData.get("subHeadline");
      
      if (headline) existingEvent.headline = headline;
      if (subHeadline) existingEvent.subHeadline = subHeadline;
  
      // Handle image update if provided
      const file = formData.get("imageUrl");
      if (file) {
        // Validate file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const mimeType = file.type;
        const size = file.size;
  
        // Validate file size (10MB max)
        const maxSize = 10 * 1024 * 1024;
        if (size > maxSize) {
          return NextResponse.json(
            { error: "File size too large. Maximum size is 10MB" },
            { status: 400 }
          );
        }
  
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(mimeType)) {
          return NextResponse.json(
            { error: "Invalid file type. Only JPEG, PNG, and WebP images are allowed" },
            { status: 400 }
          );
        }
  
        // Upload new image to Cloudinary
        const { secure_url } = await uploadToCloudinary(buffer, mimeType);
        existingEvent.imageUrl = secure_url;
      }
  
      existingEvent.updatedAt = new Date();
      await existingEvent.save();
  
      return NextResponse.json({
        success: true,
        data: existingEvent
      });
  
    } catch (error) {
      console.error("Error updating event:", error);
      return NextResponse.json(
        { error: "Failed to update event" },
        { status: 500 }
      );
    }
  }
  
  // DELETE event
  export async function DELETE(req) {
    try {
      const { searchParams } = new URL(req.url);
      const eventId = searchParams.get('id'); // Extract event ID from query params
  
      if (!eventId) {
        return NextResponse.json(
          { error: "Event ID is required" },
          { status: 400 }
        );
      }
  
      await connectDB();
  
      const event = await Event.findByIdAndDelete(eventId);
  
      if (!event) {
        return NextResponse.json(
          { error: "Event not found" },
          { status: 404 }
        );
      }
  
      // Optional: Delete image from Cloudinary
      try {
        const urlParts = event.imageUrl.split('/');
        const publicId = `childrens-house/events/${urlParts.at(-1).split('.')[0]}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
      }
  
      return NextResponse.json({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      return NextResponse.json(
        { error: "Failed to delete event" },
        { status: 500 }
      );
    }
  }
  