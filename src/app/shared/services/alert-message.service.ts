import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {delay, finalize, first} from 'rxjs/operators';

type AlertType = 'success' | 'danger'

export interface Alert {
  type: AlertType,
  text: string
}

const DEFAULT_DELAY = 1000;

@Injectable({providedIn: 'root'})
export class AlertService {
  public alert$ = new BehaviorSubject<Alert | null>(null);

  success(text: string) {
    this.doAlert({type: 'success', text});
  }

  danger(text: string) {
    this.doAlert({type: 'danger', text});
  }

  private doAlert(alert: Alert): void {
    this.alert$.next(alert);
    this.alert$
      .pipe(
        first(),
        delay(DEFAULT_DELAY),
        finalize(() => this.alert$.next(null)))
      .subscribe();
  }
}
