import { NextApiRequest } from 'next';
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest) {
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

            NextResponse.json({ message: 'Counts updated successfully', result }, { status: 201 });
        } catch (error) {
            console.error('Error updating counts:', error);
            NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    } else {
        NextResponse.json({ message: 'Method not allowed' }, { status: 403 });
    }
}
