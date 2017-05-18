import Db from './Db';

export default class ChecksDb extends Db {
    constructor(jiraKey) {
        super(`checks/${jiraKey}`);

        const now = Date.now();
        const cutoff = now - (1 * 1000);
        const old = this.ref.orderByChild('locked/lockedAt').startAt(0).endAt(cutoff);
        this._expiredLockFunc = (snapshot) => { this.unlock(snapshot.key); };

        old.on('child_added', this._expiredLockFunc);
    }

    lock(id, uid) {
        return this.get(id)
            .then(check => {
                const newcheck = {
                    ...check,
                    locked: {
                        lockedAt: Date.now(),
                        uid,
                    },
                };

                return this.update(id, newcheck);
            });
    }

    unlock(id) {
        const ref = this.ref.child(id);

        return ref.child('locked').remove()
            .then(() => {
                return ref.once('value');
            })
            .then((snapshot) => {
                this.emit('child_changed', snapshot.key, snapshot.val());
            })
    }

    destroy() {
        super.destroy();
        this.ref.off('child_added', this._expiredLockFunc);
    }
}
