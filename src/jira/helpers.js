export function getUserInformations() {
    const avatarElement = document.querySelector('#header-details-user-fullname');
    const displayname = avatarElement.getAttribute('data-displayname');
    const username = avatarElement.getAttribute('data-username');
    const avatarImageElement = avatarElement.querySelector('img');

    return {
        displayname,
        username,
        avatarUrl: avatarImageElement.src.split('?')[0],
    }
}

export function getTaskInformations() {
    const ISSUE_KEY = 'data-issue-key';
    const headerElement = document.querySelector('#stalker');
    const issueKey = headerElement.querySelector(`[${ISSUE_KEY}]`).getAttribute(ISSUE_KEY);
    const issueTitle = headerElement.querySelector('#summary-val').innerText;
    const assignee = JSON.parse(document.querySelector("[id^='issue_summary_assignee']").getAttribute('data-user'));
    const reporter = JSON.parse(document.querySelector("[id^='issue_summary_reporter']").getAttribute('data-user'));
    const createdAt = new Date(document.querySelector('#created-val').querySelector('time').getAttribute('datetime'));
    return {
        issueKey,
        issueTitle,
        assignee,
        reporter,
        createdAt,
    }
}
