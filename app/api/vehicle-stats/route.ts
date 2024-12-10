import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const query = `
                SELECT *
                    FROM counts
                ORDER BY timestamp DESC
            `;
            const [result] = await pool.execute(query);

            if (!result) {
                res.status(404).json({ message: 'No data' });
            }

            return res.status(200).json({ data: result });
        } catch (error) {
            console.error('Error getting counts:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
