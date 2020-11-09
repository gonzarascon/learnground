import React from 'react';
import fs from 'fs';
import path from 'path';
import { DemoLayout } from '@/components';
import { ClassView } from '@/containers';

function GamificadoCourse({ demoMD }) {
  return (
    <DemoLayout>
      <ClassView source={demoMD} />
    </DemoLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'master-en-css', 'class-number': '0' } }],
    fallback: false,
  };
}

export async function getStaticProps() {
  const mdPath = path.join(process.cwd(), 'public/demo.md');

  const demoMD = fs.readFileSync(mdPath, 'utf8');

  return {
    props: {
      demoMD,
    },
  };
}

export default GamificadoCourse;
