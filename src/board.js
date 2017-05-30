import { getUserInformations, attachDetailViewChangedCallback } from './jira/helpers';
import renderChecksEditor from './task/services/renderChecksEditor';
import firebaseInit from './task/services/firebaseInit';
import fontAwesomeCssInject from './task/services/fontAwesomeCssInject';
import errorDisplay from './task/services/errorDisplay';

const currentUser = getUserInformations();

fontAwesomeCssInject();

attachDetailViewChangedCallback((jira) => {
  const beforeElement = document.getElementById('descriptionmodule').parentNode;

  firebaseInit()
    .then(() => {
        const beforeElement = document.getElementById('descriptionmodule').parentNode;

        renderChecksEditor(beforeElement, 'ghx-detail-section', jira, currentUser);
      })
    .catch((error) => {
      errorDisplay(error, beforeElement);
    });
});
