import React from "react";
import ReactDOM from "react-dom";

import JiraModule from "../components/JiraModule";
import ChecksEditor from "../components/ChecksEditor";

const ID = "CHECKLIST";

function cleanPreviousRendering() {
  const element = document.getElementById(ID);
  if (!element) {
    return;
  }

  element.remove();
}

export function insertCheckListContainer(target) {
  cleanPreviousRendering();

  const container = document.createElement("div");
  container.id = ID;

  target.parentNode.insertBefore(container, target);

  return container;
}

function renderChecksEditor(target, className, jira, currentUser) {
  const root = insertCheckListContainer(target);

  ReactDOM.render(
    <JiraModule className={className}>
      <ChecksEditor jira={jira} user={currentUser} />
    </JiraModule>,
    root
  );
}

export default renderChecksEditor;
