import { getTaskInformations, getUserInformations } from './jira/helpers';
import renderChecksEditor from './task/services/renderChecksEditor';
import firebaseInit from './task/services/firebaseInit';
import fontAwesomeCssInject from './task/services/fontAwesomeCssInject';
import errorDisplay from './task/services/errorDisplay';

const jira = getTaskInformations();
const currentUser = getUserInformations();

const beforeElement = document.getElementById('descriptionmodule');

fontAwesomeCssInject();

firebaseInit()
  .then(() => {
    renderChecksEditor(beforeElement, null, jira, currentUser);
  })
  .catch((error) => {
    errorDisplay(error, beforeElement);
  });
