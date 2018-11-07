import EventEmitter from 'eventemitter3';

import { getDb } from './connect';
import LogsDb from './LogsDb';

export default class Db extends EventEmitter {
    constructor(dbRootElement) {
        super();
        this.ref = getDb().ref(dbRootElement);
        this.logDb = new LogsDb();
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

        this.ref.push()
            .set({
                ...obj,
                modifiedAt,
                createdAt,
            }, (error) => {
              if (error) {
                this.log('create error', error);
              }
            });
    }

    delete(id) {
        this.ref.child(id).remove((error) => {
          if (error) {
            this.log('delete error', error);
          }
        });
    }

    update(id, obj) {
        const modifiedAt = Date.now();
        const objRef = this.ref.child(id);

        const modifiedObj = {
            ...obj,
            modifiedAt,
        };

        objRef.update(modifiedObj, (error) => {
            if (error) {
                this.log('update error', error);
            }
        });
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

    log(message, error) {
        console.log(message);

        if (error) {
          console.error(error);

          const finalMessage = `${message}: ${error.message}`;

          this.logDb.create({
            message: finalMessage,
            stack: error.stack.toString(),
          });
        }
    }
}

