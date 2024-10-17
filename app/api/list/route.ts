import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Define the type for the request argument
export const POST = async (request: Request) => {
  try {
    // `request.json()` is asynchronous, so await it
    const data = await request.json();

    const {task} = data
    const result =  await prisma.todo.create({ data:{
        task:task
    }});
    if(!result){
    return NextResponse.json({ message: 'Error Creating Task'},{status:402});
    }
    return NextResponse.json({ message: 'TaskList created successfully'});
  } catch (error) {
    console.error('Error creating TaskList:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

export const GET = async () => {
    try {
        const taskList  = await prisma.todo.findMany()
        return NextResponse.json(taskList)
    } catch (error) {
        console.error('Error fetching Task List:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
} 