import { getUserInformations } from "./jira/helpers";

import SelectedIssueChangeWatcher from "./jira/SelectedIssueChangeWatcher";
import renderChecksEditor from "./task/services/renderChecksEditor";
import firebaseInit from "./task/services/firebaseInit";
import fontAwesomeCssInject from "./task/services/fontAwesomeCssInject";
import errorDisplay from "./task/services/errorDisplay";

async function renderCheckList(jira) {
  const beforeElement = document.getElementById("descriptionmodule").parentNode;
  const currentUser = await getUserInformations();

  try {
    const beforeElement = document.getElementById("descriptionmodule")
      .parentNode;

    renderChecksEditor(beforeElement, "ghx-detail-section", jira, currentUser);
  } catch (error) {
    errorDisplay(error, beforeElement);
  }
}

(async () => {
  fontAwesomeCssInject();
  await firebaseInit();

  new SelectedIssueChangeWatcher(jiraDetails => {
    renderCheckList(jiraDetails);
  });
})();
