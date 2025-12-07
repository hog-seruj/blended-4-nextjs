import { fetchPosts } from '@/lib/api';
import PostsClient from './Posts.client';
import type { Metadata, ResolvingMetadata } from 'next';

type PostPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  // read route params
  const { slug } = await params;
  const userId = slug[0];
  return {
    title: userId === 'All' ? 'Posts - All Users' : `Posts - User ${userId}`,
  };
}

export default async function PostsPage({ params }: PostPageProps) {
  const { slug } = await params;

  const userId = slug[0];
  const response = await fetchPosts({
    searchText: '',
    page: 1,
    ...(userId !== 'All' && { userId }),
  });

  return (
    <>
      const userId = slug[0];
      <PostsClient initialData={response} userId={userId} />
    </>
  );
}
