export default class DuplicateException extends Error {
  key: string[];

  constructor(key: string[]) {
    super();
    this.key = key;
  }
}
