import qs from 'qs';

export async function getUserInformations() {
  const displayname = document.querySelector('[name=ajs-remote-user-fullname]').content;
  const username = document.querySelector('[name=ajs-remote-user]').content;

  return {
    displayname,
    username,
    avatarUrl: ''
  };
}

function getUserData(element) {
  // // Disabled, the backgroundImage css property appears asynchronously
  // // TODO: find a way to wait for it?
  // const avatarUrl = element
  //   .querySelector('span[role=img]')
  //   .style.backgroundImage.match(/(https:\/\/.*?)"/)[1];

  const displayName = element.querySelector('[class^="SingleLineTextInput__ReadView"]').innerText;

  return {
    // avatarUrl,
    displayName
  };
}

function getUserDataOld(selector) {
  const domContainer = document.querySelector(selector);

  if (!domContainer) {
    return {};
  }

  const userAttribute = domContainer.getAttribute('data-user');

  if (!userAttribute) {
    return {};
  }

  return JSON.parse(userAttribute);
}

function getIssueKey() {
  let issueKey;

  try {
    issueKey = document.location.pathname.match(/\/browse\/([A-Za-z0-9\-]+)/)[1]; // get key as part of the pathName
  } catch (e) {
    const { selectedIssue } = qs.parse(document.location.search, {
      ignoreQueryPrefix: true
    });
    issueKey = selectedIssue;
  }

  return issueKey;
}

export function getTaskInformations(element) {
  const useOld = Boolean(document.querySelector('#created-val'));
  const info = useOld ? getTaskInformationsOld(element) : getTaskInformationsNew(element);

  return {
    ...info,
    issueKey: getIssueKey()
  };
}

function getTaskInformationsNew(element = document) {
  const issueTitle = element.querySelector(
    '[data-test-id="issue.views.issue-base.foundation.summary.heading"]'
  ).innerText;

  const assigneeElement = getBoxInformationRightPanel('assignee');
  const reporterElement = getBoxInformationRightPanel('reporter');

  const assignee = getUserData(assigneeElement);
  const reporter = getUserData(reporterElement);

  return { issueTitle, assignee, reporter };
}

// https://simple-it.atlassian.net/browse/OC-11145 for example, has a right panel
// with various "box", get one by its title
function getBoxInformationRightPanel(title, rootElement = document) {
  const boxes = [
    ...rootElement.querySelector(
      '[data-test-id="issue.views.issue-base.context.context-items.primary-items"]'
    ).children
  ];

  return boxes.reduce((goodOne, boxElement) => {
    const boxTitleElement = boxElement.querySelector('h2');
    if (boxTitleElement && boxTitleElement.innerText.toLowerCase().trim() === title) {
      return boxElement;
    }

    return goodOne;
  }, null);
}

function getTaskInformationsOld(element) {
  const headerElement = element || document.querySelector('#stalker');
  const issueTitle = headerElement.querySelector('#summary-val').innerText;

  const assignee = getUserDataOld("[id^='issue_summary_assignee']");
  const reporter = getUserDataOld("[id^='issue_summary_reporter']");

  const createdValElement = document.querySelector('#created-val');

  const createdAt = createdValElement
    ? new Date(
        document
          .querySelector('#created-val')
          .querySelector('time')
          .getAttribute('datetime')
      )
    : '';

  return {
    issueTitle,
    assignee,
    reporter,
    createdAt
  };
}

export function getDetailIssueElement(rootElement = document) {
  return rootElement.querySelector('.ghx-detail-issue');
}
