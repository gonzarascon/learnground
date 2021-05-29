/**
 *
 * @param {String} message
 * @param {String} url
 * @param {"wp" | "tw" | "link"} provider
 */

import { EventsEnum } from './events';
import { registerEvent } from './firebase/dataFunctions';
import { copyTextToClipboard } from './helpers';

export const Share = async (message, url, provider) => {
  registerEvent(EventsEnum.SHARE_COURSE, {
    [EventsEnum.SHARE_COURSE]: { url, provider },
  });
  switch (provider) {
    case 'tw': {
      return window.open(
        `https://twitter.com/intent/tweet?text=${message}&url=${url}`
      );
    }
    case 'wp':
      return window.open(`https://wa.me/?text=${message} ${url}`);

    case 'link':
    default:
      return await copyTextToClipboard(`${message} ${url}`);
  }
};
