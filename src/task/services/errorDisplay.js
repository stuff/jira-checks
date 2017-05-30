function errorDisplay(error, rootElement) {
  rootElement.innerHTML = `<div style="color:red; padding: 5px;">${error.message}</div>`;
}

export default errorDisplay;
