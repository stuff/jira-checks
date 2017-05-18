function getOptionsFromChromeStorage() {
    return new Promise((resolve) => {
        chrome.storage.sync.get({
            firebaseConfig: '',
        }, resolve);
    });
}

function getOptionsFromLocalStorage() {
    const firebaseConfig = JSON.parse(localStorage.getItem('firebaseConfig')) || {};
    
    return Promise.resolve({ firebaseConfig });
}

export default function getOptions() {
    if (chrome.storage) {
        return getOptionsFromChromeStorage();
    } else {
        return getOptionsFromLocalStorage();
    }
}
