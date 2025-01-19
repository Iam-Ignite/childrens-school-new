import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import streamifier from "streamifier";
import cloudinary from "../../../lib/cloudinary";
import { Event } from "../../../model/eventSchema";

// Cloudinary upload function (keep existing function)
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

// GET all events
export async function GET() {
  try {
    await connectDB();
    
    const events = await Event.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean(); // Convert to plain JavaScript objects
    
    return NextResponse.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    if (!req.body) {
      return NextResponse.json(
        { error: "No data provided" },
        { status: 400 }
      );
    }

    // Get the form data
    const formData = await req.formData();
    
    // Extract all fields
    const file = formData.get("image");
    const headline = formData.get("headline");
    const subHeadline = formData.get("subHeadline");

    // Validate required fields
    if (!file || !headline || !subHeadline) {
      return NextResponse.json(
        { error: "Missing required fields: image, headline, and subHeadline are required" },
        { status: 400 }
      );
    }

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

    // Connect to MongoDB
    await connectDB();

    // Upload to Cloudinary
    const { secure_url } = await uploadToCloudinary(buffer, mimeType);

    // Create Event document
    const event = new Event({
      headline,
      subHeadline,
      imageUrl: secure_url,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Save to database
    await event.save();

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        id: event._id,
        headline: event.headline,
        subHeadline: event.subHeadline,
        imageUrl: event.imageUrl,
        createdAt: event.createdAt
      }
    });

  } catch (error) {
    console.error("Event creation error:", error);

    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
// PUT (update) event
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
    const file = formData.get("image");
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
    const eventId = searchParams.get("id");

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
    // Extract public_id from the URL and delete it
    const urlParts = event.imageUrl.split('/');
    const publicId = `childrens-house/events/${urlParts[urlParts.length - 1].split('.')[0]}`;
    
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (cloudinaryError) {
      console.error("Error deleting image from Cloudinary:", cloudinaryError);
      // Continue with the response even if Cloudinary deletion fails
    }

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}