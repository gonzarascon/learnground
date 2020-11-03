import React, { useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { HomeContainer } from '@/containers';

function Home() {
  const setInfo = useStore((state) => state.setInfo);

  useEffect(() => {
    setInfo('info de la home');
  }, []);
  return <HomeContainer />;
}

export default Home;
