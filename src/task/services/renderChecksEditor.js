import React from 'react';
import ReactDOM from 'react-dom';

import JiraModule from '../components/JiraModule';
import ChecksEditor from '../components/ChecksEditor';

function renderChecksEditor(beforeElement, className, jira, currentUser) {
  const root = document.createElement('div');
  root.id = 'CHECKLIST';

  beforeElement.parentNode.insertBefore(root, beforeElement);

  ReactDOM.render(
    <JiraModule className={ className }>
      <ChecksEditor jira={ jira } user={ currentUser } />
    </JiraModule>,
    root
  );
}

export default renderChecksEditor;
