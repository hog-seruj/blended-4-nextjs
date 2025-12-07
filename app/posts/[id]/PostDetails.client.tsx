'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostDetails.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import Loading from '@/app/loading';

export default function PostDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(Number(id)),
  });

  useEffect(() => {
    const fn = async () => {
      setUser(await fetchUserById(Number(post?.userId)));
    };
    fn();
  }, [post]);

  if (isLoading) return <Loading />;

  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <button className={css.backBtn} onClick={handleClickBack}>
              ← Back
            </button>

            <div className={css.post}>
              <div className={css.wrapper}>
                <div className={css.header}>
                  <h2>{post?.title}</h2>
                </div>

                <p className={css.content}>{post?.body}</p>
              </div>
              <p className={css.user}>Author: {user?.name}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
