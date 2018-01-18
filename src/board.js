import {
  getUserInformations,
  getDetailIssueElement,
  getTaskInformations
} from "./jira/helpers";

import SelectedIssueChangeWatcher from "./jira/SelectedIssueChangeWatcher";
import renderChecksEditor from "./task/services/renderChecksEditor";
import firebaseInit from "./task/services/firebaseInit";
import fontAwesomeCssInject from "./task/services/fontAwesomeCssInject";
import errorDisplay from "./task/services/errorDisplay";

function renderCheckList(jira) {
  const beforeElement = document.getElementById("descriptionmodule").parentNode;
  const currentUser = getUserInformations();

  try {
    const beforeElement = document.getElementById("descriptionmodule")
      .parentNode;

    renderChecksEditor(beforeElement, "ghx-detail-section", jira, currentUser);
  } catch (error) {
    errorDisplay(error, beforeElement);
  }
}

async function init() {
  fontAwesomeCssInject();
  await firebaseInit();

  new SelectedIssueChangeWatcher(jiraDetails => {
    renderCheckList(jiraDetails);
  });
}

init();
