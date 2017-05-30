import getOptions from '../../options/getOptions';
import { initDb } from '../../db/connect';

let promise = null;

function firebaseInit() {
  if (promise) {
    return promise;
  }
  
  promise = getOptions()
    .then((config) => {
      if (!config.firebaseConfig) {
        throw new Error('Go to Jira Checks extension options page to configure Firebase');
      }

      initDb(config.firebaseConfig);
    });
  
  return promise;
}

export default firebaseInit;
