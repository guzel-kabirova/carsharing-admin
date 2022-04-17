import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {Pagination} from './pagination.enum';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  public buttonName = Pagination;

  @Input()
  public firstPage = 1;
  @Input()
  public totalPages = 0;

  private _activePage = this.firstPage;

  public get activePage(): number {
    return this._activePage;
  }

  public set activePage(page: number) {
    this._activePage = page;
  }

  public get isPrevActive(): boolean {
    return this.activePage > this.firstPage;
  }

  public get isNextActive(): boolean {
    return this.activePage < this.totalPages;
  }

  public get isFirstDots(): boolean {
    return this.activePage > 3;
  }

  public get isLastDots(): boolean {
    return this.activePage < this.totalPages - 2;
  }

  public get pagesInterval(): number[] {
    const current = this.activePage;
    let before = current - 1;
    let after = current + 1;
    const pages = [];

    switch (current) {
      case this.totalPages:
        before = before - 2;
        break;
      case this.totalPages - 1:
        before = before - 1;
        break;
      case this.firstPage:
        after = after + 2;
        break;
      case this.firstPage + 1:
        after = after + 1;
        break;
    }

    for (let page = before; page <= after; page++) {
      if (page > this.totalPages) {
        break;
      }

      if (page === 0) {
        page++;
      }

      pages.push(page);
    }

    return pages;
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
