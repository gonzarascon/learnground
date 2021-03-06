import React from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ContentView, DescriptionView } from '@/components/EditCourse';

const EditCourseView = () => {
  return (
    <Box pt="5" mx="10">
      <Tabs variant="enclosed-colored" colorScheme="blue">
        <TabList>
          <Tab>Contenidos</Tab>
          <Tab>Detalles</Tab>
        </TabList>
        <TabPanels bgColor="white" roundedBottom="md" shadow="base">
          <TabPanel>
            <ContentView />
          </TabPanel>
          <TabPanel>
            <DescriptionView />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default EditCourseView;
