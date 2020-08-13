import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Alert} from "../data/alert";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSource: BehaviorSubject<Alert> = new BehaviorSubject(null);

  public alert: Observable<Alert> = this.alertSource.asObservable();

  constructor() { }

  set (alert: Alert) {
    this.alertSource.next(alert);
  }
}
