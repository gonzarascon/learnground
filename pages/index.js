import React, { useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';

import { HomeContainer } from '@/containers';
import { Layout } from '@/components';

function Home() {
  return (
    <Layout>
      <HomeContainer />
    </Layout>
  );
}

export default Home;
