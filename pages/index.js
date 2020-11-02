import React, { useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';

function Home() {
  const setInfo = useStore((state) => state.setInfo);

  useEffect(() => {
    setInfo('info de la home');
  }, []);
  return (
    <section>
      Index
      <Link href="/about">
        <a>about</a>
      </Link>
    </section>
  );
}

export default Home;
