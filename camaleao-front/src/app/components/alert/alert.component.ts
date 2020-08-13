import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Alert} from "../../core/data/alert";
import {AlertService} from "../../core/services/alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @ViewChild('alertDiv', { static: true }) alertDiv: ElementRef;

  public alert: Alert;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.alert.subscribe(alert => {

      this.alert = null;
      this.alert = alert;

      setTimeout(() => {
        this.alert = null;
      }, 12000);

    });
  }

  closeAlert() {
    this.alertDiv.nativeElement.classList.remove('show');
  }

  public getType() {
    return `alert-${this.alert.type}`;
  }
}
