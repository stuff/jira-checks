import React from 'react';
import ReactDOM from 'react-dom';

import { initDb } from './db/connect';
import getOptions from './options/getOptions';

import ChecksEditor from './task/components/ChecksEditor';

const root = document.getElementById('editor');

const jira = {
    issueKey: 'OC-6414',
};

const user = {"displayname":"Nicolas Challeil", "username":"nicolas.challeil","avatarUrl":"https://secure.gravatar.com/avatar/10f4291158e65dedd821ba259e9a4c98"};

getOptions()
    .then((config) => {
        if (!config.firebaseConfig) {
            ReactDOM.render(<div>can't find Firebase configuration</div>, root);
            return;
        }

        initDb(config.firebaseConfig);

        ReactDOM.render(<ChecksEditor jira={ jira } user={ user } />, root);

    })
