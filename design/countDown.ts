import { EventEmitter, EventName } from './eventEmitter';

enum CountdownStatus {
  running,
  paused,
  stoped,
}

export interface RemainTimeDate {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  count: number;
}
export class CountDown extends EventEmitter {
  private static COUNT_IN_MILLISECOND: number = 1 * 100;
  private static SECOND_IN_MILLSECOND: number = 10 * CountDown.COUNT_IN_MILLISECOND;
  private static MINUTE_IN_MILLSECOND: number = 60 * CountDown.COUNT_IN_MILLISECOND;
  private static HOUR_IN_MILLSECOND: number = 60 * CountDown.MINUTE_IN_MILLSECOND;
  private static DAY_IN_MILLSECOND: number = 24 * CountDown.HOUR_IN_MILLSECOND;

  private endTime: number;
  private remainTime: number = 0;
  private status: CountdownStatus = CountdownStatus.stoped;
  private step: number;

  constructor(endTime: number, step: number = 1e3) {
    super();
    this.endTime = endTime;
    this.step = step;

    this.start();
  }

  start () {
    this.emit(EventName.CountdownStart);
    this.status = CountdownStatus.running;

    this.countdown();
  }

  stop () {
    this.emit(EventName.CountdownStop);
    this.status = CountdownStatus.stoped;
  }

  pause () {
    this.emit(EventName.CountdownPause);
    this.status = CountdownStatus.paused;
  }

  private countdown () {
    if(this.status !== CountdownStatus.running) return;

    this.remainTime = Math.max(this.endTime - Date.now(), 0);

    this.emit(EventName.Countdown, this.parseRemainTime(this.remainTime), this.remainTime);

    if(this.remainTime > 0) {
      setTimeout(() => this.countdown(), this.step);
    } else {
      this.stop();
    }
  }

  private parseRemainTime(remainTime: number) {
    let time = remainTime;

    const days = Math.floor(time / CountDown.DAY_IN_MILLSECOND);
    time = time % CountDown.DAY_IN_MILLSECOND;

    const hours = Math.floor(time / CountDown.HOUR_IN_MILLSECOND);
    time = time % CountDown.HOUR_IN_MILLSECOND;

    const minutes = Math.floor(time / CountDown.MINUTE_IN_MILLSECOND);
    time = time % CountDown.MINUTE_IN_MILLSECOND;

    const seconds = Math.floor(time / CountDown.SECOND_IN_MILLSECOND);
    time = time % CountDown.SECOND_IN_MILLSECOND;

    const count = Math.floor(time / CountDown.COUNT_IN_MILLISECOND);

    return {
      days,
      hours,
      minutes,
      seconds,
      count
    }
  }
}

const endTime: number = new Date('2021/03/18').getTime();

console.log('xxxx', endTime);