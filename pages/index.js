import React, { useEffect } from 'react';

import { HomeContainer } from '@/containers';
import { Layout } from '@/components';
import { registerEvent } from '@/lib/firebase/dataFunctions';

function Home() {
  useEffect(() => {
    registerEvent('Visited Page', { value: 'Index' });
  }, []);
  return (
    <Layout>
      <HomeContainer />
    </Layout>
  );
}

export default Home;
