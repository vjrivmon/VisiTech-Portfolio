import { NextRequest, NextResponse } from 'next/server';
import { getGitHubRepos, getFeaturedProjects } from '@/lib/github/fetchers';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');

    let projects;
    if (featured === 'true') {
      projects = await getFeaturedProjects();
    } else {
      projects = await getGitHubRepos();
    }

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
