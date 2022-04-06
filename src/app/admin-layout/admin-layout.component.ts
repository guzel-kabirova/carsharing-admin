import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {takeUntil, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {AuthService} from '../auth/services/auth.service';
import {DestroyService} from '../shared/services/destroy.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class AdminLayoutComponent {
  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _service: AuthService,
    private _router: Router,
  ) { }

  logout() {
    this._service.logout()
      .pipe(
        tap(() => {
          this._router.navigate(['']);
          this._service.setToken(null);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }
}
