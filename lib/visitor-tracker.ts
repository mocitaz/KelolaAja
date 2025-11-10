// Client-side visitor tracking utility

export async function trackVisitor(page: string = '/') {
  try {
    // Get visitor information
    const visitorData = {
      page_visited: page,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    }

    // Send to API (we don't track IP on client side for privacy)
    await fetch('/api/visitors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitorData),
    })
  } catch (error) {
    // Silently fail - visitor tracking shouldn't break the app
    console.error('Error tracking visitor:', error)
  }
}

