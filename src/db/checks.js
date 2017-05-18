import { getDb } from './connect';

export function getChecksRef(jiraKey) {
    return getDb().ref(`checks/${jiraKey}`);
}

export function createCheck(jiraKey, check) {
    const ref = getChecksRef(jiraKey);
    const createdAt = Date.now();
    const modifiedAt = Date.now();

    ref.push().set({
        ...check,
        modifiedAt,
        createdAt,
    });
}

export function updateCheck(jiraKey, id, check) {
    const ref = getChecksRef(jiraKey);
    const modifiedAt = Date.now();
    const checkRef = ref.child(id);

    const modifiedCheck = {
        ...check,
        modifiedAt,
    };

    checkRef.update(modifiedCheck);
}

export function getChecks(jiraKey) {
    const ref = getChecksRef(jiraKey);

    return ref.once('value')
        .then(snapshot => {
            const list = {};

            snapshot.forEach(childSnapshot => {
                list[childSnapshot.key] = childSnapshot.val();
            });

            return list;
        });
}

export function listenToAddedCheck(jiraKey, callback) {
    const ref = getChecksRef(jiraKey);
    const listener = data => { callback(data.key, data.val()); };

    ref.on('child_added', listener);

    return () => {
        ref.off('child_added', listener);
    };
}

export function listenToChangedChecks(jiraKey, callback) {
    const ref = getChecksRef(jiraKey);
    const listener = data => { callback(data.key, data.val()); };

    ref.on('child_changed', listener);

    return () => {
        ref.off('child_changed', listener);
    };
}

export default {
    get: getChecks,
    create: createCheck,
    update: updateCheck,
    listenToAdded: listenToAddedCheck,
    listenToChanged: listenToChangedChecks,
}
