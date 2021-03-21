import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DemoLayout } from '@/components';
import { ProfileView } from '@/containers';
import { getProfileData } from '@/lib/firebase/dataFunctionsNode';
import { useProfileStore, useStore, useUserStore } from '@/lib/store';
import useCookies from '@/lib/useCookies';
import { missionsDataset } from '@/lib/gamifiedHandler';
import { updateBadgeAndXP } from '@/lib/firebase/dataFunctions';

function GamificadoProfile({ profileData, profileID }) {
  const [uid] = useUserStore((state) => [state.uid]);

  const [profileAlert, setProfileAlert] = useStore((state) => [
    state.profileAlert,
    state.setProfileAlert,
  ]);
  const [cookieValue, setCookie, isLoading] = useCookies();
  const [
    setProfileData,
    setVisitorOwner,
    setBadge,
  ] = useProfileStore((state) => [
    state.setProfileData,
    state.setVisitorOwner,
    state.setBadge,
  ]);

  useEffect(() => {
    const badgeToEarn = missionsDataset.find(
      (obj) => obj.pk === 'first_view_profile'
    );

    if (!isLoading && badgeToEarn) {
      if (!cookieValue) {
        setCookie({
          badges: [badgeToEarn],
        });

        const { badgeId, xpAmmount } = badgeToEarn;
        updateBadgeAndXP(uid, badgeId, xpAmmount).then(() => {
          setBadge(badgeId);
        });
      } else {
        const badges = cookieValue.badges || [];

        if (!badges.find((obj) => obj.pk === 'first_view_profile')) {
          setCookie({
            badges: [...badges, badgeToEarn],
          });

          const { badgeId, xpAmmount } = badgeToEarn;
          updateBadgeAndXP(uid, badgeId, xpAmmount).then(() => {
            setBadge(badgeId);
          });
        }
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (profileAlert) {
      setProfileAlert(false);
    }
  }, [profileAlert]);

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
