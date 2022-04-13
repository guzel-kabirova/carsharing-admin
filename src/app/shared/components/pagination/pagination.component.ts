import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {Pagination} from './pagination.enum';
import {range} from '../../utils/range';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  public buttonName = Pagination;
  @Input()
  private _paginationIndex = 0;
  @Input()
  private _paginationSize = 10;
  @Input()
  private _totalPages = 31;

  public pages = range(this._paginationIndex, this._totalPages);

  public get isFirst(): boolean {
    return this.activePage === 0;
  }

  public get isLast(): boolean {
    return this.activePage === this._totalPages - 1;
  }

  private _activePage = this._paginationIndex;

  public get activePage(): number {
    return this._activePage;
  }

  public set activePage(page: number) {
    this._activePage = page;
  }

  constructor() { }

  public isActive(page: number): boolean {
    return this.activePage === page;
  }

  public setActivePage(page: number) {
    return this.activePage = page;
  }

  public onArrowClick(buttonName: Pagination) {
    if (buttonName === Pagination.Prev) {
      this.activePage = this.activePage - 1;
      return;
    }

    if (buttonName === Pagination.Next) {
      this.activePage = this.activePage + 1;
      return;
    }

    return;
  }
}
