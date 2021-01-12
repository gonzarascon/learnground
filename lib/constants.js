const Color = require('color-js');

export const Colors = {
  black: Color('#000000'),
  white: Color('#ffffff'),
};

export const Media = {
  small: '(min-width: 36em)',
  medium: '(min-width: 48em)',
  large: '(min-width: 62em)',
  extraLarge: '(min-width: 75em)',
  extraExtraLarge: '(min-width: 87.5em)',
  iMac: '(min-width: 90.063em)',
  // iPhone Media
  iPhone11:
    'only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
  iPhone11Pro:
    'only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
  iPhone11ProMax:
    'only screen and (min-device-width: 414px) and (max-device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
  iPhoneSE:
    'only screen and (min-device-width: 375px) and (max-device-width: 667px)',
  iPhone8Plus:
    'only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-device-pixel-ratio: 3)',
  fillAvailable: '(-webkit-touch-callout: none)',
};

export const UserBaseModel = {
  badges: [],
  courses: [],
  pins: [],
  createdCourses: [],
  email: '',
  firstname: '',
  lastname: '',
  money: 0,
  titles: [],
  type: '',
  username: '',
  xp: 0,
};

export const CourseBaseModel = {
  categoryId: '',
  creatorId: '',
  description: '',
  subscribers: [],
  /**
   * subscriber object:
   * {
   *  lastClass: number;
   *  progress: number;
   *  uid: string;
   * }
   */
  thumbnail: '',
  title: '',
  slug: '',
};

export const ContentBaseModel = {
  chatId: '',
  data: '',
  title: '',
  active: true,
};
