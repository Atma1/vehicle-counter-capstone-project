import createDBConnection from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    if (req.method === 'GET') {
        try {
            const pool = createDBConnection();
            const query = `
                SELECT *
                    FROM counts
                ORDER BY timestamp DESC
            `;
            const [result] = await pool.execute(query);

            if (!result) {
                NextResponse.json({ data: [] }, { status: 200 });
            }

            return NextResponse.json({ data: result }, { status: 200 });
        } catch (error) {
            console.error('Error getting counts:', error);
            NextResponse.json({ error: 'Internal server error' });
        }
    } else {
        NextResponse.json({ message: 'Method not allowed' });
    }
}
