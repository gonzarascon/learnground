import _ from 'lodash';
const levelDataset = [
  {
    number: 0,
    minAmmount: 0,
    maxAmmount: 99,
    hasTitle: true,
    titleId: 0,
    hasBadge: true,
    badgeId: 0,
  },
  {
    number: 1,
    minAmmount: 100,
    maxAmmount: 249,
    hasTitle: false,
    titleId: null,
    hasBadge: false,
    badgeId: null,
  },
  {
    number: 2,
    minAmmount: 250,
    maxAmmount: 409,
    hasTitle: false,
    titleId: null,
    hasBadge: true,
    badgeId: 1,
  },
  {
    number: 3,
    minAmmount: 250,
    maxAmmount: 409,
    hasTitle: false,
    titleId: null,
    hasBadge: false,
    badgeId: null,
  },
  {
    number: 4,
    minAmmount: 410,
    maxAmmount: 579,
    hasTitle: false,
    titleId: null,
    hasBadge: false,
    badgeId: null,
  },
  {
    number: 5,
    minAmmount: 580,
    maxAmmount: 760,
    hasTitle: true,
    titleId: 2,
    hasBadge: true,
    badgeId: 2,
  },
];

export const parseXPToLevel = (xp) => {
  const lastLevel = levelDataset[levelDataset.length - 1];
  const levelObject = _.find(levelDataset, (o) => {
    if (xp >= o.minAmmount && xp <= o.maxAmmount) {
      return o;
    } else if (xp > lastLevel.maxAmmount) {
      return lastLevel;
    }
    return null;
  });

  return levelObject;
};

export const missionsDataset = [
  {
    pk: 'first_view_profile',
    badgeId: 3,
    xpAmmount: 30,
  },
  {
    pk: 'first_view_store',
    badgeId: 4,
    xpAmmount: 20,
  },
  {
    pk: 'first_created_course',
    badgeId: 5,
    xpAmmount: 50,
  },
  {
    pk: 'first_subscribed_course',
    badgeId: 6,
    xpAmmount: 50,
  },
  {
    pk: 'shared_course',
    badgeId: 7,
    xpAmmount: 75,
  },
];
