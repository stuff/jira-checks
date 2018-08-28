import { getTaskInformations, getUserInformations } from './jira/helpers';
import renderChecksEditor from './task/services/renderChecksEditor';
import firebaseInit from './task/services/firebaseInit';
import fontAwesomeCssInject from './task/services/fontAwesomeCssInject';
import errorDisplay from './task/services/errorDisplay';



const beforeElement = document.getElementById('descriptionmodule');

fontAwesomeCssInject();

firebaseInit()
  .then(async () => {
    const jira = getTaskInformations();
    const currentUser = await getUserInformations();

    renderChecksEditor(beforeElement, null, jira, currentUser);
  })
  .catch((error) => {
    errorDisplay(error, beforeElement);
  });
