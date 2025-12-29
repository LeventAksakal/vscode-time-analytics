import type * as vscode from 'vscode';
import { BucketContext } from './bucket-context';
import { formatDay } from '../utils/time-utils';

function msUntilNextDay(now: Date): number {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return Math.max(0, next.getTime() - now.getTime());
}

export class DayTracker implements vscode.Disposable {
  private timer: NodeJS.Timeout | undefined;
  private currentDay: string;

  constructor(private readonly buckets: BucketContext) {
    const now = new Date();
    this.currentDay = formatDay(now);
    this.buckets.updateContext({ dateKey: this.currentDay }, now.getTime());
    this.scheduleNext();
  }

  private scheduleNext() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    const now = new Date();
    const delay = msUntilNextDay(now);
    this.timer = setTimeout(() => {
      const tickNow = new Date();
      this.currentDay = formatDay(tickNow);
      this.buckets.updateContext(
        { dateKey: this.currentDay },
        tickNow.getTime(),
      );
      this.scheduleNext();
    }, delay);
  }

  dispose() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }
}
