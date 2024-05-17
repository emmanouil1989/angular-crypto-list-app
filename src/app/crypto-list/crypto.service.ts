import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CryptoInterface } from '../cypto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  http = inject(HttpClient);
  toaster = inject(ToastrService);
  getListOfCryptos() {
    return this.http.get<{ allCryptos: Array<CryptoInterface> }>(
      'http://localhost:4000/crypto',
      {
        withCredentials: true,
      }
    );
  }

  constructor() {}
}
