import React from 'react';
import { DemoLayout } from '@/components';
import useSWR from 'swr';

import { CreateCourseView } from '@/containers';
import { fetcher } from '@/lib/helpers';

function GamificadoCourse() {
  const { data: categories, error } = useSWR('/api/categories/get', fetcher);
  return (
    <DemoLayout>
      <CreateCourseView categories={categories} />
    </DemoLayout>
  );
}

export default GamificadoCourse;
