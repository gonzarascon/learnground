import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { DemoLayout } from '@/components';
import { ClassView } from '@/containers';
import { getContentByNumber } from '@/lib/firebase/dataFunctionsNode';
import { useContentStore } from '@/lib/store';

function GamificadoCourse({ data }) {
  const setContent = useContentStore((state) => state.setContent);

  useEffect(() => {
    setContent(data);
  }, [setContent]);
  return (
    <DemoLayout isCourse>
      <ClassView source={data.data} />
    </DemoLayout>
  );
}

GamificadoCourse.propTypes = {
  data: PropTypes.string,
};

/**
 *
 * @param {import('next').GetServerSidePropsContext} ctx;
 */
export async function getServerSideProps(ctx) {
  const { params } = ctx;

  const contentData = await getContentByNumber({
    courseSlug: params.slug,
    contentNumber: params['class-number'],
  });

  return {
    props: {
      data: contentData,
    },
  };
}

export default GamificadoCourse;
