import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent {
  constructor(private _location: Location) { }

  public back() {
    this._location.back();
  }
}
