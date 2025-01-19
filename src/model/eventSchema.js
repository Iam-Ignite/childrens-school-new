import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: [true, 'Headline is required'],
    trim: true
  },
  subHeadline: {
    type: String,
    required: [true, 'Sub-headline is required'],
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the timestamps before saving
eventSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);