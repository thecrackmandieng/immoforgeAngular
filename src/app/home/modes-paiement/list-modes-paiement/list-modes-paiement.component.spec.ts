import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListModesPaiementComponent } from './list-modes-paiement.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListModesPaiementComponent', () => {
  let component: ListModesPaiementComponent;
  let fixture: ComponentFixture<ListModesPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListModesPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
