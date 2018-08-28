import { getTaskInformations } from "./helpers";

export default class SelectedIssueChangeWatcher {
  constructor(onChange) {
    this.onChange = onChange;
    this.issue = null;
    this.view = null;
    this.waitIssueLoadInterval = null;
    this.watchUrlChanges();
  }

  watchUrlChanges = () => {
    setInterval(() => {
      const url = new URL(document.location.href);
      const issue = url.searchParams.get("selectedIssue");
      const view = url.searchParams.get("view");

      const viewHasChanged = view !== this.view;
      const issueHasChanged = issue !== this.issue;

      if (issueHasChanged) {
        this.issue = issue;
      }

      if (viewHasChanged) {
        this.view = view;
        this.issue = null;
      }

      if (issueHasChanged) {
        this.handleIssueChange(issue);
      }
    }, 500);
  };

  handleIssueChange(issue) {
    this.stopWaitIssueLoadInterval();

    this.waitIssueLoadInterval = setInterval(() => {
      const element = document.getElementById("issuekey-val");

      if (!element) {
        return;
      }

      const currentDisplayedIssue = element.innerText;

      if (currentDisplayedIssue === issue) {
        const detailElement = document.getElementById("ghx-detail-contents");

        if (!detailElement) {
          return;
        }

        this.stopWaitIssueLoadInterval();
        this.onChange(getTaskInformations(detailElement));
      }
    }, 100);
  }

  stopWaitIssueLoadInterval() {
    if (!this.waitIssueLoadInterval) {
      return false;
    }

    clearInterval(this.waitIssueLoadInterval);
    this.waitIssueLoadInterval = null;
  }
}
