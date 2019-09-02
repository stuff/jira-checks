import qs from 'qs';
import { getTaskInformations } from './helpers';

export default class SelectedIssueChangeWatcher {
  constructor(onChange) {
    this.onChange = onChange;
    //this.issue = null;
    this.modalIsOpened = null;
    this.waitIssueLoadInterval = null;
    this.watchUrlChanges();
  }

  watchUrlChanges = () => {
    setInterval(() => {
      let { modal, selectedIssue } = qs.parse(document.location.search, {
        ignoreQueryPrefix: true
      });

      const modalIsOpened = Boolean(modal);
      const modalStatusChanged = modalIsOpened !== this.modalIsOpened;

      if (modalStatusChanged) {
        this.modalIsOpened = modalIsOpened;
      }

      if (modalStatusChanged && modalIsOpened) {
        this.handleIssueChange(selectedIssue);
      }
    }, 100);
  };

  handleIssueChange(issue) {
    this.stopWaitIssueLoadInterval();

    this.waitIssueLoadInterval = setInterval(() => {
      const element = document.querySelector(
        'div[role=dialog] [aria-label*=attachment]'
      );

      if (!element) {
        return;
      }

      const dialog = document.querySelector('div[role=dialog]');

      this.stopWaitIssueLoadInterval();
      this.onChange(getTaskInformations(dialog));
    }, 50);
  }

  stopWaitIssueLoadInterval() {
    if (!this.waitIssueLoadInterval) {
      return false;
    }

    clearInterval(this.waitIssueLoadInterval);
    this.waitIssueLoadInterval = null;
  }
}
