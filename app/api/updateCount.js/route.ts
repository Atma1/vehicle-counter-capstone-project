import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { timestamp, location, car_count, motorbike_count, truck_count, bus_count } = req.body;

        try {
            const query = `
                INSERT INTO counts (timestamp, location, car_count, motorbike_count, truck_count, bus_count)
                VALUES (?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    car_count = VALUES(car_count),
                    motorbike_count = VALUES(motorbike_count),
                    truck_count = VALUES(truck_count),
                    bus_count = VALUES(bus_count)
            `;
            const values = [timestamp, location, car_count, motorbike_count, truck_count, bus_count];
            const [result] = await pool.execute(query, values);

            res.status(200).json({ message: 'Counts updated successfully', result });
        } catch (error) {
            console.error('Error updating counts:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
