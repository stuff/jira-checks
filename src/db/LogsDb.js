import { getDb } from './connect';

export default class LogsDb {
  constructor() {
    const isoDate = new Date().toISOString().split('T')[0];

    this.ref = getDb().ref(`logs/${isoDate}`);
  }

  create(obj) {
    const createdAt = Date.now();

    this.ref.push().set({
      ...obj,
      createdAt,
    });
  }
}
