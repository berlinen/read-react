import { EventEmitter } from './eventEmitter';

enum CountdownStatus {
  running,
  paused,
  stoped,
}

export class CountDown extends EventEmitter {
  private endTime: number;
  private remainTime: number = 0;
  private status: CountdownStatus = CountdownStatus.stoped;
  private step: number;

  constructor(endTime: number, step: number = 1e3) {
    super();
    this.endTime = endTime;
    this.step = step;
  }
}