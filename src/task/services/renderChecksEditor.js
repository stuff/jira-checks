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

function renderChecksEditor(beforeElement, className, jira, currentUser) {
  cleanPreviousRendering();

  const root = document.createElement("div");
  root.id = ID;

  beforeElement.parentNode.insertBefore(root, beforeElement);

  ReactDOM.render(
    <JiraModule className={className}>
      <ChecksEditor jira={jira} user={currentUser} />
    </JiraModule>,
    root
  );
}

export default renderChecksEditor;
