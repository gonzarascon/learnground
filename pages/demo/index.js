import React, { useEffect } from 'react';
import useCookies from 'lib/useCookies';
import { DemoLayout } from '@/components';
import { DemoIndex } from '@/containers';
import { registerEvent } from '@/lib/firebase/dataFunctions';

function GamificadoIndex() {
  const [cookieValue, setCookie, isLoading] = useCookies();

  useEffect(() => {
    registerEvent('Visited Page', { screen_name: 'Index demo' });
    if (!cookieValue && !isLoading) {
      setCookie({});
    }
  }, [cookieValue]);

  return (
    <DemoLayout>
      <DemoIndex />
    </DemoLayout>
  );
}

export default GamificadoIndex;
