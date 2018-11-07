import EventEmitter from 'eventemitter3';

import { getDb } from './connect';

export default class Db extends EventEmitter {
    constructor(dbRootElement) {
        super();
        this.ref = getDb().ref(dbRootElement);

        this.attachEvents();
    }

    attachEvents() {
        this._child_added = data => {
            this.emit('child_added', data.key, data.val());
        };
        this.ref.on('child_added', this._child_added);


        this._child_changed = data => {
            this.emit('child_changed', data.key, data.val());
        };
        this.ref.on('child_changed', this._child_changed);

        this._child_removed = data => {
            this.emit('child_removed', data.key, data.val());
        };
        this.ref.on('child_removed', this._child_removed);


        getDb().ref('.info/connected').on('value', (snap) => {
            this.emit(snap.val() ? 'online' : 'offline');
        });
    }

    destroy() {
        this.ref.off('child_added', this._child_added);
        this.ref.off('child_changed', this._child_changed);
        this.ref.off('child_removed', this._child_removed);
    }

    create(obj) {
        const createdAt = Date.now();
        const modifiedAt = Date.now();

        this.ref.push().set({
            ...obj,
            modifiedAt,
            createdAt,
        });
    }

    delete(id) {
        this.ref.child(id).remove();
    }

    update(id, obj) {
        const modifiedAt = Date.now();
        const objRef = this.ref.child(id);

        const modifiedObj = {
            ...obj,
            modifiedAt,
        };

        objRef.update(modifiedObj);
    }

    getAll() {
        return this.ref.once('value')
            .then(snapshot => {
                const list = {};

                snapshot.forEach(childSnapshot => {
                    list[childSnapshot.key] = childSnapshot.val();
                });

                return list;
            })
    }

    get(child) {
        return this.ref.child(child).once('value').then(snapshot => {
            return snapshot.val();
        });
    }
}

