import axios from 'axios';
import { createStandaloneToast } from '@chakra-ui/react';
const dev = process.env.NODE_ENV !== 'production';

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
    document.body.removeChild(textArea);
    return { message: 'success' };
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
    document.body.removeChild(textArea);
    return { message: 'error' };
  }
}

/**
 * @function copyTextToClipboard
 * @param {string} text
 */

export function copyTextToClipboard(text) {
  const toast = createStandaloneToast();

  const successToast = {
    title: 'Copiado al portapapeles',
    description: 'El mensaje se ha copiado al portapapeles, ¡Compártelo!',
    status: 'success',
  };

  const errorToast = {
    title: 'Error al copiar mensaje',
    description:
      'El mensaje no se ha copiado al portapapeles, por favor inténtalo nuevamente.',
    status: 'error',
  };

  if (!navigator.clipboard) {
    if (fallbackCopyTextToClipboard(text).message === 'success') {
      toast({
        ...successToast,
        duration: '5000',
        isClosable: true,
      });
    } else {
      toast({
        ...errorToast,
        duration: '5000',
        isClosable: true,
      });
    }
  }
  const navigatorAction = navigator.clipboard
    .writeText(text)
    .then(() =>
      toast({
        ...successToast,
        duration: '5000',
        isClosable: true,
      })
    )
    .catch(() =>
      toast({
        ...errorToast,
        duration: '5000',
        isClosable: true,
      })
    );

  return navigatorAction;
}

/**
 * @function pxToRem
 * @param {number}  value
 * @returns {string} Parsed px number to rem size
 * 
 
 */
export const pxToRem = (value) => `${value / 16}rem`;

/**
 * @function getCurrentYear
 * @returns {number} Current year
 */

export const getCurrentYear = () => new Date().getFullYear();

/**
 * @function logEvent
 * @description Logs action events with label to Google Analytics / TagManager
 * @param {{action: string, label:string}} Object
 */

export const logEvent = ({ action, label }) => {
  if (!dev) {
    window.gtag('event', action, {
      event_category: 'Acciones',
      event_label: label,
      value: undefined,
    });
  }
  return;
};

/**
 * @function slugify
 * @description Transforms string to URI friendly slug
 * @param {string} string: The string to slugify
 * @author: [hagemann](https://gist.github.com/hagemann)
 */
export const slugify = (string) => {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

/**
 * parseCammelCase
 * @param {String} string
 */
export const parseCammelCase = (string) =>
  string.replace(/([A-Z])/g, ' $1').trim();

/**
 * fetcher
 * @param {string} url
 */

export const fetcher = async (url) => axios.get(url).then((res) => res.data);
