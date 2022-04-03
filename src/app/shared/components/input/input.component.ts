import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'input[app-input]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit, OnChanges {
  @Input()
  public invalid = false;

  input?: HTMLInputElement;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.input = this.elRef.nativeElement;
  }

  ngOnChanges() {
    if (this.input) {
      if (this.invalid) {
        this.setErrorStyle();
        return;
      }
      this.removeErrorStyle();
    }
  }

  private setErrorStyle() {
    this.renderer.setStyle(this.input, 'border', '1px solid var(--color-danger)');
    this.renderer.setStyle(this.input, 'box-shadow', 'var(--shadow-error)');
  }

  private removeErrorStyle() {
    this.renderer.removeStyle(this.input, 'border');
    this.renderer.removeStyle(this.input, 'box-shadow');
  }
}
