import db from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    if (req.method === 'GET') {
        try {
            const pool = db;
            const query = `
                SELECT *
                    FROM counts
                ORDER BY timestamp DESC
            `;
            const [result] = await pool.execute(query);

            if (!result) {
                return NextResponse.json({ data: [] }, { status: 200 });
            }

            return NextResponse.json({ data: result }, { status: 200 });
        } catch (error) {
            console.error('Error getting counts:', error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
}
