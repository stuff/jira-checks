import { getUserInformations } from './jira/helpers';

import SelectedIssueChangeWatcherOld from './jira/SelectedIssueChangeWatcherOld';
import SelectedIssueChangeWatcher from './jira/SelectedIssueChangeWatcher';
import renderChecksEditor from './task/services/renderChecksEditor';
import firebaseInit from './task/services/firebaseInit';
import fontAwesomeCssInject from './task/services/fontAwesomeCssInject';
import errorDisplay from './task/services/errorDisplay';

fontAwesomeCssInject();

async function renderCheckList(jira) {
  const dialog = document.querySelector('div[role=dialog]');
  let descriptionModuleElement = document.getElementById('descriptionmodule');

  // "New" JIRA UI
  if (!descriptionModuleElement) {
    const element = dialog.querySelectorAll('[class^=GridColumnElement__GridColumn]')[1];
    descriptionModuleElement = element.querySelectorAll(':scope > div > div')[2];
  }

  const currentUser = await getUserInformations();

  try {
    renderChecksEditor(descriptionModuleElement, null, jira, currentUser);
  } catch (error) {
    errorDisplay(error, descriptionModule);
    throw error;
  }
}

(async () => {
  await firebaseInit();

  const useOld = !Boolean(document.querySelector('.bento-enabled'));
  const Klass = useOld ? SelectedIssueChangeWatcherOld : SelectedIssueChangeWatcher;

  new Klass((jiraDetails) => {
    renderCheckList(jiraDetails);
  });
})();
