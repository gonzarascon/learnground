import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DemoLayout } from '@/components';
import { EditContentView } from '@/containers';
import { getContentBySlug } from '@/lib/firebase/dataFunctionsNode';
import { useCourseEditStore } from '@/lib/store';

function GamificadoCourse({ contentData }) {
  const setContentData = useCourseEditStore((state) => state.setContentData);

  useEffect(() => {
    if (contentData) {
      setContentData(contentData);
    }
  }, [contentData]);

  return (
    <DemoLayout>
      <EditContentView />
    </DemoLayout>
  );
}

GamificadoCourse.propTypes = {
  contentData: PropTypes.shape({
    data: PropTypes.shape({
      chatId: PropTypes.string,
      order: PropTypes.number,
      data: PropTypes.string,
      active: PropTypes.bool,
      slug: PropTypes.string,
      title: PropTypes.string,
    }),
    uid: PropTypes.string,
  }),
};

/**
 * getServerSideProps
 * @param {import('next').GetServerSidePropsContext} ctx
 */
export async function getServerSideProps(ctx) {
  const { slug, title } = ctx.params;

  const contentData = await getContentBySlug({
    courseSlug: slug,
    contentSlug: title,
  });

  return {
    props: {
      contentData,
    },
  };
}

export default GamificadoCourse;
