import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate secret
    const secret = process.env.REVALIDATE_SECRET || 'default-secret-change-this';

    if (body.secret !== secret) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Revalidate specific path or all paths
    const paths = body.paths || ['/', '/projects', '/about'];

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      paths,
      message: 'Cache successfully revalidated'
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}