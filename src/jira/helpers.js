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

export function getTaskInformations(element) {
    const ISSUE_KEY = 'data-issue-key';
    const headerElement = element || document.querySelector('#stalker');
    const issueKeyElement = [...headerElement.querySelectorAll(`[${ISSUE_KEY}]`)].pop();
    const issueKey = issueKeyElement.getAttribute(ISSUE_KEY);
    const issueTitle = headerElement.querySelector('#summary-val').innerText;
    const assignee = JSON.parse(document.querySelector("[id^='issue_summary_assignee']").getAttribute('data-user'));
    const reporter = JSON.parse(document.querySelector("[id^='issue_summary_reporter']").getAttribute('data-user'));
    
    const createdValElement = document.querySelector('#created-val');
    
    const createdAt = createdValElement ? new Date(document.querySelector('#created-val').querySelector('time').getAttribute('datetime')) : '';
    
    return {
        issueKey,
        issueTitle,
        assignee,
        reporter,
        createdAt,
    }
}

let detailElementMutationObserver = null;

export function attachDetailViewChangedCallback(callback) {
  
  if (detailElementMutationObserver !== null) {
    detailElementMutationObserver.disconnect();
  }

  detailElementMutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach((mutation) => {
      if (
        mutation.target.id === 'ghx-detail-contents' &&
        mutation.addedNodes.length > 0 &&
        mutation.addedNodes[0].id === 'ghx-detail-issue'
      ) {
        const detailIssueElement = mutation.target.querySelector('.ghx-detail-issue');
        callback(getTaskInformations(detailIssueElement));
      }
    });
  });

  detailElementMutationObserver.observe(document.getElementById('ghx-detail-view'), {
    childList: true,
    subtree: true,
  });
}
