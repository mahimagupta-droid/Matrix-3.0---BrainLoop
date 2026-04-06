// app/api/tutor/history/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { dbConnect } from '../../../../lib/dbConnections/dbConnection';
import ChatMessage from '../../../../lib/models/chatMessage';

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  await dbConnect();
  const messages = await ChatMessage.find({ userId })
    .sort({ timestamp: -1 })
    .limit(50);
  return NextResponse.json({ messages });
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  const { question, response, context } = await request.json();
  await dbConnect();
  const message = await ChatMessage.create({
    userId,
    question,
    response,
    context,
  });
  
  return NextResponse.json({ success: true, message });
}