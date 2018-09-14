import elementReady from 'element-ready';

export async function getUserInformations() {
  const displayname = document.querySelector("[name=ajs-remote-user-fullname]").content;
  const username = document.querySelector("[name=ajs-remote-user]").content;
  const avatarImageElement = await elementReady('#menu-profile [role="img"]');

  return {
    displayname,
    username,
    avatarUrl: avatarImageElement.style.getPropertyValue('background-image').split('"')[1]
  };
}

function getUserData(selector) {
  const domContainer =  document.querySelector(selector);

  if (!domContainer) {
    return {};
  }

  const userAttribute = domContainer.getAttribute('data-user');

  if (!userAttribute) {
    return {};
  }

  return JSON.parse(userAttribute);
}

export function getTaskInformations(element) {
  const ISSUE_KEY = "data-issue-key";
  const headerElement = element || document.querySelector("#stalker");
  const issueKeyElement = [
    ...headerElement.querySelectorAll(`[${ISSUE_KEY}]`)
  ].pop();
  const issueKey = issueKeyElement.getAttribute(ISSUE_KEY);
  const issueTitle = headerElement.querySelector("#summary-val").innerText;

  const assignee = getUserData('[id^=\'issue_summary_assignee\']');
  const reporter = getUserData("[id^='issue_summary_reporter']");

  const createdValElement = document.querySelector("#created-val");

  const createdAt = createdValElement
    ? new Date(
        document
          .querySelector("#created-val")
          .querySelector("time")
          .getAttribute("datetime")
      )
    : "";

  return {
    issueKey,
    issueTitle,
    assignee,
    reporter,
    createdAt
  };
}

export function getDetailIssueElement(rootElement = document) {
  return rootElement.querySelector(".ghx-detail-issue");
}
