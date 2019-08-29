import { getTaskInformations, getUserInformations } from './jira/helpers';
import renderChecksEditor from './task/services/renderChecksEditor';
import firebaseInit from './task/services/firebaseInit';
import fontAwesomeCssInject from './task/services/fontAwesomeCssInject';
import errorDisplay from './task/services/errorDisplay';

const descriptionModule = document.getElementById('descriptionmodule');

fontAwesomeCssInject();

firebaseInit()
  .then(async () => {
    const jira = getTaskInformations();
    const currentUser = await getUserInformations();

    renderChecksEditor(descriptionModule, null, jira, currentUser);
  })
  .catch(error => {
    errorDisplay(error, descriptionModule);
  });
