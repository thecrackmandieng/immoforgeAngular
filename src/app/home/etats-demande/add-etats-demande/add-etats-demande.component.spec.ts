import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEtatsDemandeComponent } from './add-etats-demande.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('AddEtatsDemandeComponent', () => {
  let component: AddEtatsDemandeComponent;
  let fixture: ComponentFixture<AddEtatsDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        NgbActiveModal
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEtatsDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
