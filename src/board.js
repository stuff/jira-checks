import React from 'react';
import ReactDOM from 'react-dom';

import { getTaskInformations, getUserInformations, attachDetailViewChangedCallback } from './jira/helpers';
import { initDb } from './db/connect';
// import JiraModule from './task/components/JiraModule';
// import ChecksEditor from './task/components/ChecksEditor';
import renderChecksEditor from './task/services/renderChecksEditor';
import getOptions from './options/getOptions';

const currentUser = getUserInformations();

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

    attachDetailViewChangedCallback((jira) => {
      const beforeElement = document.getElementById('descriptionmodule').parentNode;
      
      renderChecksEditor(beforeElement, 'ghx-detail-section', jira, currentUser);
      
      // const root = document.createElement('div');
      // root.id = 'CHECKLIST';
      //
      // beforeElement.parentNode.insertBefore(root, beforeElement);
      //
      // ReactDOM.render(
      //   <JiraModule className="ghx-detail-section">
      //     <ChecksEditor jira={ jira } user={ currentUser } />
      //   </JiraModule>,
      //   root
      // );
      
    });
  });
