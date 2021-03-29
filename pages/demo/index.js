import React, { useEffect } from 'react';
import useCookies from 'lib/useCookies';
import { DemoLayout } from '@/components';
import { DemoIndex } from '@/containers';

function GamificadoIndex() {
  const [cookieValue, setCookie, isLoading] = useCookies();

  useEffect(() => {
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
