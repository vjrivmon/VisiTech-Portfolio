import { getProjectBySlug } from '@/lib/github/fetchers';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const project = await getProjectBySlug(params.slug);

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
