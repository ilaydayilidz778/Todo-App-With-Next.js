import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const newTitle = req.body.newTitle as string;
        const inputId = req.body.inputId as string;

        await prisma.todo.update({
            where: {
                id: inputId,
            },
            data: {
                title: newTitle,
            },
        });

        return res.status(200).json({ message: 'Todo updated successfully' });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
