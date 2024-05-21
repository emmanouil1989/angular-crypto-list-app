import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCryptoComponent } from './create-crypto.component';

describe('CreateCryptoComponent', () => {
  let component: CreateCryptoComponent;
  let fixture: ComponentFixture<CreateCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCryptoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
