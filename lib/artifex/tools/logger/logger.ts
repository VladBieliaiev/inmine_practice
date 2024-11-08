export class ArtifexLogger {
  private static _prefix: string = 'Artifex Logger';

  public static set prefix(prefix: string) {
    this._prefix = prefix;
  }

  public static get prefix() {
    return `[${this._prefix}]`;
  }

  public static log(...messages: string[]) {
    console.log(this.prefix, ...messages);
  }

  public static warn(...messages: string[]) {
    console.warn(this.prefix, ...messages);
  }

  public static error(...messages: string[]) {
    console.error(this.prefix, ...messages);
  }

  public static info(...messages: string[]) {
    console.info(this.prefix, ...messages);
  }
}
