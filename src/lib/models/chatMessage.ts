// lib/models/ChatMessage.ts
import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
  userId: String,
  question: String,
  response: String,
  context: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.ChatMessage || 
  mongoose.model('ChatMessage', ChatMessageSchema);