import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      )
    }

    // Get database pool
    const pool = getPool()

    // Insert contact submission into database
    const result = await pool.query(
      `INSERT INTO contact_submissions (name, email, phone, message, source)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [name, email || null, phone || null, message, 'landing_page']
    )

    return NextResponse.json(
      {
        success: true,
        message: 'Contact submission saved successfully',
        id: result.rows[0].id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving contact submission:', error)
    return NextResponse.json(
      { error: 'Failed to save contact submission' },
      { status: 500 }
    )
  }
}

