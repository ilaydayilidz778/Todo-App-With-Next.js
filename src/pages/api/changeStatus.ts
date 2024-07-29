import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const inputId = req.body.inputId as string;
        const todo = await prisma.todo.findUnique({
            where: {
                id: inputId,
            },
        });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        const updateStatus = !todo.isComplateed;

        await prisma.todo.update({
            where: {
                id: inputId,
            },
            data: {
                isComplateed: updateStatus,
            },
        });

        return res.status(200).json({ message: 'Todo status updated successfully' });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
