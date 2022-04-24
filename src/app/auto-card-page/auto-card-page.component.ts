import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-auto-card-page',
  templateUrl: './auto-card-page.component.html',
  styleUrls: ['./auto-card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCardPageComponent {

  constructor() { }

  public handleSave() {
    console.log('saved');
  }

  handleCancel() {
    console.log('cancel');
  }

  handleDelete() {
    console.log('delete');
  }
}
