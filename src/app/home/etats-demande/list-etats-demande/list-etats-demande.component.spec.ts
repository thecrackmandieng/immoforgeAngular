import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListEtatsDemandeComponent } from './list-etats-demande.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListEtatsDemandeComponent', () => {
  let component: ListEtatsDemandeComponent;
  let fixture: ComponentFixture<ListEtatsDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEtatsDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
