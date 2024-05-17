import { Component, Input, input } from '@angular/core';
import { CryptoInterface } from '../cypto';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-crypto-list-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './crypto-list-item.component.html',
})
export class CryptoListItemComponent {
  @Input() cyproItem: CryptoInterface | undefined = undefined;
}
