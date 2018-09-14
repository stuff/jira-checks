import { getUserInformations } from "./jira/helpers";

import SelectedIssueChangeWatcher from "./jira/SelectedIssueChangeWatcher";
import renderChecksEditor from "./task/services/renderChecksEditor";
import firebaseInit from "./task/services/firebaseInit";
import fontAwesomeCssInject from "./task/services/fontAwesomeCssInject";
import errorDisplay from "./task/services/errorDisplay";

async function renderCheckList(jira) {
  const descriptionModule =  document.getElementById("descriptionmodule");
  const currentUser = await getUserInformations();

  try {
    renderChecksEditor(descriptionModule, "ghx-detail-section", jira, currentUser);
  } catch (error) {
    errorDisplay(error, descriptionModule);
  }
}

(async () => {
  fontAwesomeCssInject();
  await firebaseInit();

  new SelectedIssueChangeWatcher(jiraDetails => {
    renderCheckList(jiraDetails);
  });
})();
