import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ip_address, user_agent, referrer, page_visited } = body

    // Get database pool
    const pool = getPool()

    // Insert visitor data into database
    await pool.query(
      `INSERT INTO visitors (ip_address, user_agent, referrer, page_visited)
       VALUES ($1, $2, $3, $4)`,
      [
        ip_address || null,
        user_agent || null,
        referrer || null,
        page_visited || '/',
      ]
    )

    return NextResponse.json(
      { success: true, message: 'Visitor data saved successfully' },
      { status: 201 }
    )
  } catch (error) {
    // Silently fail - visitor tracking is not critical
    // Don't log error in production to avoid console noise
    if (process.env.NODE_ENV === 'development') {
      console.error('Error saving visitor data:', error)
    }
    // Return success to not break the frontend
    return NextResponse.json(
      { success: false, message: 'Visitor tracking unavailable' },
      { status: 200 }
    )
  }
}

export async function GET() {
  try {
    const pool = getPool()

    // Get visitor statistics
    const totalVisitors = await pool.query('SELECT COUNT(*) as count FROM visitors')
    const todayVisitors = await pool.query(
      `SELECT COUNT(*) as count FROM visitors 
       WHERE DATE(created_at) = CURRENT_DATE`
    )

    return NextResponse.json({
      success: true,
      data: {
        total: parseInt(totalVisitors.rows[0].count),
        today: parseInt(todayVisitors.rows[0].count),
      },
    })
  } catch (error) {
    // Silently fail - return default values
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching visitor statistics:', error)
    }
    return NextResponse.json({
      success: true,
      data: {
        total: 0,
        today: 0,
      },
    })
  }
}

