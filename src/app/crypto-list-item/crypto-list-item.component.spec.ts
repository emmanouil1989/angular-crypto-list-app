import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoListItemComponent } from './crypto-list-item.component';

describe('CyptoListItemComponent', () => {
  let component: CryptoListItemComponent;
  let fixture: ComponentFixture<CryptoListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CryptoListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
