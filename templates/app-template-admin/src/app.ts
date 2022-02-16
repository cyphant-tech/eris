import { checkHost } from './utils/dev_helper';

checkHost();

export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
      // console.error(err.message);
    },
  },
};
