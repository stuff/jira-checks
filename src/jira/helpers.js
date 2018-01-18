export function getUserInformations() {
  const avatarElement = document.querySelector("#header-details-user-fullname");
  const displayname = avatarElement.getAttribute("data-displayname");
  const username = avatarElement.getAttribute("data-username");
  const avatarImageElement = avatarElement.querySelector("img");

  return {
    displayname,
    username,
    avatarUrl: avatarImageElement.src.split("?")[0]
  };
}

export function getTaskInformations(element) {
  const ISSUE_KEY = "data-issue-key";
  const headerElement = element || document.querySelector("#stalker");
  const issueKeyElement = [
    ...headerElement.querySelectorAll(`[${ISSUE_KEY}]`)
  ].pop();
  const issueKey = issueKeyElement.getAttribute(ISSUE_KEY);
  const issueTitle = headerElement.querySelector("#summary-val").innerText;
  const assignee = JSON.parse(
    document
      .querySelector("[id^='issue_summary_assignee']")
      .getAttribute("data-user")
  );
  const reporter = JSON.parse(
    document
      .querySelector("[id^='issue_summary_reporter']")
      .getAttribute("data-user")
  );

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
