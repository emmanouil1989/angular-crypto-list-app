import { Component, inject } from '@angular/core';
import { CryptoService } from './crypto.service';
import { CryptoInterface } from '../cypto';
import { Observable, catchError, throwError } from 'rxjs';
import { CryptoListItemComponent } from '../crypto-list-item/crypto-list-item.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crypto-list',
  standalone: true,
  imports: [CryptoListItemComponent],
  templateUrl: './crypto-list.component.html',
})
export class CryptoListComponent {
  cryptoService = inject(CryptoService);
  toaster = inject(ToastrService);
  cryptos$: Array<CryptoInterface> = [];

  ngOnInit() {
    this.cryptoService
      .getListOfCryptos()
      .pipe(
        catchError((error) => {
          this.toaster.error('Error', error.error);

          return throwError(() => {});
        })
      )
      .subscribe({
        next: (cryptoListResponse) => {
          this.cryptos$ = cryptoListResponse.allCryptos;
        },
      });
  }
}
