import React from 'react';
import ReactDOM from 'react-dom';

import { getTaskInformations, getUserInformations } from './jira/helpers';
import { initDb } from './db/connect';
import renderChecksEditor from './task/services/renderChecksEditor';

import getOptions from './options/getOptions';

const jira = getTaskInformations();
const currentUser = getUserInformations();

const beforeElement = document.getElementById('descriptionmodule');


function addCss(fileName) {
    const head = document.head;
    const link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = fileName;

    head.appendChild(link)
}

addCss('//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

getOptions()
    .then((config) => {
        if (!config.firebaseConfig) {
            ReactDOM.render(<div>Go to extension options page to configure Firebase</div>, root);
            return;
        }

        initDb(config.firebaseConfig);

        renderChecksEditor(beforeElement, null, jira, currentUser);
    });

