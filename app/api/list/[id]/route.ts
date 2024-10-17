import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ListType = {
    id: string;
};

type ParamType = {
    params: ListType;
};

export const PUT = async (request: Request, { params }: ParamType) => {
    try {
        const id = parseInt(params.id); // Ensure the id is a number

        // Check if the ID is valid
        if (isNaN(id) || id < 1) {
            return NextResponse.json({ message: 'Invalid ID' }, { status: 400 }); // Bad Request
        }

        const result = await prisma.todo.update({
            where: { id: id },
            data: { status: 1 }
        });

        if (!result) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'TaskList Updated successfully' });
    } catch (error) {
        console.error('Error Updating TaskList:', error); // Log the full error details
        return NextResponse.json({ message: "Internal Server Error", error: error }, { status: 500 });
    }
};

export const DELETE =async (request: Request, { params }: ParamType) => {
    try {
        const id = parseInt(params.id); // Ensure the id is a number

        // Check if the ID is valid
        if (isNaN(id) || id < 1) {
            return NextResponse.json({ message: 'Invalid ID' }, { status: 400 }); // Bad Request
        }
        const result = await prisma.todo.delete({
            where: { id: id }
        });

        if (!result) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'TaskList Deleted successfully' });
    } catch (error) {
        console.error('Error Updating TaskList:', error); // Log the full error details
        return NextResponse.json({ message: "Internal Server Error", error: error }, { status: 500 });
    }
}