import { useEffect, useState } from 'react';
import { parseCookies, setCookie as setCookieData } from 'nookies';
/**
 * @returns {[Record<string, string | number> | null, (data: Record<string, string | number>) => void, boolean]}
 */
const useCookies = () => {
  const [cookieValue, setCookieValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = parseCookies();

  useEffect(() => {
    if (cookies.gamifiedUserInfo) {
      setCookieValue(JSON.parse(cookies.gamifiedUserInfo));
    }
    setIsLoading(false);
  }, []);

  /**
   *
   * @param {Record<string, string | number>} data
   */
  const setCookie = (data) => {
    const actualCookieValue = cookieValue ? cookieValue : {};

    const mergedCookieData = JSON.stringify({
      ...actualCookieValue,
      ...data,
    });

    setCookieData(null, 'gamifiedUserInfo', mergedCookieData, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    setIsLoading(true);

    setCookieValue(JSON.parse(mergedCookieData));
  };

  return [cookieValue, setCookie, isLoading];
};

export default useCookies;
