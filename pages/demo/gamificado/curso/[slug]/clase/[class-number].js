import PropTypes from 'prop-types';
import React from 'react';
import fs from 'fs';
import path from 'path';
import { DemoLayout } from '@/components';
import { ClassView } from '@/containers';

function GamificadoCourse({ demoMD }) {
  return (
    <DemoLayout isCourse>
      <ClassView source={demoMD} />
    </DemoLayout>
  );
}

GamificadoCourse.propTypes = {
  demoMD: PropTypes.any,
};

export async function getServerSideProps() {
  const mdPath = path.join(process.cwd(), 'public/demo.md');

  const demoMD = fs.readFileSync(mdPath, 'utf8');

  return {
    props: {
      demoMD,
    },
  };
}

export default GamificadoCourse;
