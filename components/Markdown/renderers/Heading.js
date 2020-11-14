import React from 'react';
import { Heading } from '@chakra-ui/react';

export default function CustomHeading({ level = '1', children, ...rest }) {
  //TODO: Add Heading styles

  return (
    <Heading as={`h${level}`} {...rest}>
      {children}
    </Heading>
  );
}
