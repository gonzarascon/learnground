import PropTypes from 'prop-types';
import React from 'react';
import { DemoLayout } from '@/components';
import { ClassView } from '@/containers';
import { getContentByNumber } from '@/lib/firebase/dataFunctionsNode';

function GamificadoCourse({ data }) {
  return (
    <DemoLayout isCourse>
      <ClassView source={data} />
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
      data: contentData.data.data,
    },
  };
}

export default GamificadoCourse;
