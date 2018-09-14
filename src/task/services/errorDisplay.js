import { insertCheckListContainer } from './renderChecksEditor';

function errorDisplay(error, target) {
  const rootElement = insertCheckListContainer(target);
  rootElement.innerHTML = `<div style="color:red; padding: 5px;">${error.message}</div>`;
}

export default errorDisplay;
