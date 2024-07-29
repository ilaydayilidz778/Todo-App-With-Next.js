import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const input = req.body.input as string;
        if (!input.trim()) {
            return res.status(400).json({ error: 'Input cannot be empty' });
        }

        await prisma.todo.create({
            data: {
                title: input,
            },
        });

        return res.status(200).json({ message: 'Todo created successfully' });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
