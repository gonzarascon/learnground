import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DemoLayout } from '@/components';
import { EditCourseView } from '@/containers';
import { getCourseBySlug } from '@/lib/firebase/dataFunctionsNode';
import { useCourseEditStore } from '@/lib/store';

function GamificadoCourse({ courseData }) {
  const setCourseData = useCourseEditStore((state) => state.setCourseData);
  useEffect(() => {
    if (courseData) {
      setCourseData(courseData);
    }
  }, [courseData]);
  return (
    <DemoLayout>
      <EditCourseView />
    </DemoLayout>
  );
}

GamificadoCourse.propTypes = {
  courseData: PropTypes.shape({
    data: PropTypes.shape({
      categoryId: PropTypes.number,
      creatorId: PropTypes.string,
      description: PropTypes.string,
      slug: PropTypes.string,
      subscribers: PropTypes.array,
      thumbnail: PropTypes.string,
      title: PropTypes.string,
    }),
    uid: PropTypes.string,
  }),
};

/**
 *
 * @param {import('next').GetServerSidePropsContext} ctx
 */
export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;
  const courseData = await getCourseBySlug(slug);
  return {
    props: { courseData },
  };
}

export default GamificadoCourse;
