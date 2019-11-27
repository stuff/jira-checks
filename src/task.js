import { getTaskInformations, getUserInformations } from './jira/helpers';
import renderChecksEditor from './task/services/renderChecksEditor';
import firebaseInit from './task/services/firebaseInit';
import fontAwesomeCssInject from './task/services/fontAwesomeCssInject';
import errorDisplay from './task/services/errorDisplay';

fontAwesomeCssInject();

let descriptionModuleElement = document.getElementById('descriptionmodule');

// "New" JIRA UI
if (!descriptionModuleElement) {
  const element = document.querySelectorAll('[class^=GridColumnElement__GridColumn]')[1];
  descriptionModuleElement = element.querySelectorAll(':scope > div > div')[2];
}

(async () => {
  try {
    await firebaseInit();

    const jira = getTaskInformations();
    const currentUser = await getUserInformations();

    renderChecksEditor(descriptionModuleElement, null, jira, currentUser);
  } catch (error) {
    errorDisplay(error, descriptionModuleElement);
    throw error;
  }
})();
