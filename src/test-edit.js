import React from 'react';
import ReactDOM from 'react-dom';

import { initDb } from './db/connect';
import getOptions from './options/getOptions';

import ChecksEditor from './task/components/ChecksEditor';

const root = document.getElementById('editor');

const jira = {
  issueKey: 'OC-6414'
};

const user1 = {
  displayname: 'Nicolas Challeil',
  username: 'nicolas.challeil',
  avatarUrl: 'https://secure.gravatar.com/avatar/10f4291158e65dedd821ba259e9a4c98'
};
const user2 = {
  displayname: 'Super Mario Bros',
  username: 'super.mario',
  avatarUrl: 'http://jeuxvideomobile.com/wp-content/uploads/2017/03/Super-Mario-Run-Android.png'
};

const user = document.location.search.match(/user=2/) ? user2 : user1;

getOptions().then((config) => {
  if (!config.firebaseConfig) {
    ReactDOM.render(<div>can't find Firebase configuration</div>, root);
    return;
  }

  initDb(config.firebaseConfig);

  ReactDOM.render(<ChecksEditor jira={jira} user={user} />, root);
});
