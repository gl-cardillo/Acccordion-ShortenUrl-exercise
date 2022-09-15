export const validUrl = (urlStr: string) => {
  try {
    return Boolean(new URL(urlStr));
  } catch (e) {
    return false;
  }
};

export const baseUrl = 'https://urlShort.com/';
