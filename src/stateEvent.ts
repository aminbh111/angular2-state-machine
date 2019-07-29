export class StateEvent {
  public name: string;
  public from: string[];
  public to: string;
  constructor(options: any) {
    this.name = options.name;
    this.from = options.from;
    this.to = options.to;
  }
}
