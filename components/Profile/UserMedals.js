import React from 'react';
import _ from 'lodash';
import useSWR from 'swr';
import { Box, Grid, Heading, Tooltip } from '@chakra-ui/react';
import { fetcher } from '@/lib/helpers';
import { useProfileStore } from '@/lib/store';

const UserMedals = () => {
  // eslint-disable-next-line no-unused-vars
  const { data, error } = useSWR('/api/badges/get', fetcher);
  const profileData = useProfileStore((state) => state.profileData);

  return (
    <Box gridArea="medals" h="380px">
      <Heading as="h3" mb="5">
        Medallas obtenidas
      </Heading>
      <Grid
        border="1px solid"
        borderColor="gray.200"
        rounded="md"
        h="100%"
        p="3"
        templateColumns="repeat(auto-fill, minmax(75px, 1fr))"
        autoRows="75px"
        gap="20px"
        overflowY="auto"
        maxH="308px"
      >
        {data &&
          profileData &&
          data.badges.map((badge) => {
            const Attachments = badge.fields.Attachments;
            const image = Attachments
              ? Attachments[0].thumbnails.large.url
              : null;

            return (
              <Tooltip
                label={badge.fields.description}
                key={badge.id}
                hasArrow
                textAlign="center"
                p={2}
              >
                <Box
                  h="75px"
                  w="75px"
                  rounded="100%"
                  bg="gray.300"
                  bgImg={
                    _.find(profileData.badges, (b) => b === badge.fields.id)
                      ? `url(${image})`
                      : 'none'
                  }
                  bgSize="cover"
                  bgRepeat="no-repeat"
                  bgPosition="center"
                ></Box>
              </Tooltip>
            );
          })}
      </Grid>
    </Box>
  );
};

export default UserMedals;
