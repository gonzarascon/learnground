import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DemoLayout } from '@/components';
import { ProfileView } from '@/containers';
import { getProfileData } from '@/lib/firebase/dataFunctionsNode';
import { useProfileStore, useUserStore } from '@/lib/store';

function GamificadoProfile({ profileData, profileID }) {
  const uid = useUserStore((state) => state.uid);
  const [setProfileData, setVisitorOwner] = useProfileStore((state) => [
    state.setProfileData,
    state.setVisitorOwner,
  ]);
  useEffect(() => {
    setProfileData(profileData);

    if (profileID === uid) {
      setVisitorOwner(true);
    }

    return () => {
      setProfileData(null);
      setVisitorOwner(false);
    };
  }, [uid]);
  return (
    <DemoLayout>
      <ProfileView />
    </DemoLayout>
  );
}

GamificadoProfile.propTypes = {
  profileData: PropTypes.shape({
    email: PropTypes.string,
    badges: PropTypes.array,
    type: PropTypes.string,
    xp: PropTypes.number,
    titles: PropTypes.array,
    createdCourses: PropTypes.array,
    username: PropTypes.string,
    money: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    courses: PropTypes.array,
  }),
  profileID: PropTypes.string,
};

export const getServerSideProps = async ({ params }) => {
  const { data, uid } = await getProfileData(params.username);

  return { props: { profileData: data, profileID: uid } };
};

export default GamificadoProfile;
