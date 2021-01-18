import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DemoLayout } from '@/components';
import { CourseIntroContainer } from '@/containers';
import { getCourseBySlug } from '@/lib/firebase/dataFunctionsNode';
import { useCourseStore } from '@/lib/store';

function GamificadoCourse({ courseData }) {
  const setCourseData = useCourseStore((state) => state.setCourseData);

  useEffect(() => {
    setCourseData(courseData);
  }, [courseData]);

  return (
    <DemoLayout>
      <CourseIntroContainer />
    </DemoLayout>
  );
}

GamificadoCourse.propTypes = {
  courseData: PropTypes.shape({
    data: PropTypes.shape({
      concepts: PropTypes.array,
      creatorId: PropTypes.string,
      description: PropTypes.string,
      slug: PropTypes.string,
      subscribers: PropTypes.array,
      thumbnail: PropTypes.string,
      title: PropTypes.string,
      categoryId: PropTypes.number,
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
    props: {
      courseData,
    },
  };
}

export default GamificadoCourse;
