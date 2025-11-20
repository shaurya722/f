import Cookies from 'js-cookie';
import { constants } from '@/constants';

export const tokenStore = {
  get: () => Cookies.get(constants.cookies.tokenName),
  set: token => {
    Cookies.set(constants.cookies.tokenName, token, {
      expires: 7,
      sameSite: 'strict',
    });
  },
  delete: () => {
    Cookies.remove(constants.cookies.tokenName);
  },
};

export const themeStore = {
  get: () => Cookies.get(constants.cookies.themeName) || constants.theme.light,
  set: mode => {
    Cookies.set(constants.cookies.themeName, mode, {
      expires: 365,
      sameSite: 'strict',
    });
  },
};
