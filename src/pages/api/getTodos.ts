import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const data = await prisma.todo.findMany({
                select: {
                    title: true,
                    id: true,
                    isComplateed: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
            return res.status(500).json({ error: 'Failed to fetch todos' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
