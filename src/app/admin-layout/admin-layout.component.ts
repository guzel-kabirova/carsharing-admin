import {ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {takeUntil, tap} from 'rxjs/operators';
import {BehaviorSubject, fromEvent, Observable} from 'rxjs';
import {DOCUMENT} from '@angular/common';

import {AuthService} from '../auth/services/auth.service';
import {DestroyService} from '../shared/services/destroy.service';
import {TokenService} from '../auth/services/token.service';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class AdminLayoutComponent implements OnInit {
  @ViewChild(SidebarComponent, {read: ElementRef})
  private _sidebarElement?: ElementRef<HTMLElement>;

  @ViewChild(HeaderComponent, {read: ElementRef})
  private _headerElement?: ElementRef<HTMLElement>;

  private _isSidebar = new BehaviorSubject(false);
  public isSidebar$ = this._isSidebar.asObservable();

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    @Inject(DOCUMENT) private _document: Document,
    private _service: AuthService,
    private _tokenService: TokenService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    fromEvent(this._document, 'click').pipe(
      tap(event => {
        if (this._sidebarElement?.nativeElement.contains(event.target as Node) || this._headerElement?.nativeElement.contains(event.target as Node)) {
          return;
        }
        this.closeSidebar();
      }),
      takeUntil(this._destroy$),
    )
      .subscribe();
  }

  openSidebar() {
    this._isSidebar.next(true);
  }

  private closeSidebar() {
    this._isSidebar.next(false);
  }

  logout() {
    this._service.logout()
      .pipe(
        tap(() => {
          this._router.navigate(['']);
          this._tokenService.setToken(null);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }
}
