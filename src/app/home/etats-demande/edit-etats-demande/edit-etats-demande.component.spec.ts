import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEtatsDemandeComponent } from './edit-etats-demande.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('EditEtatsDemandeComponent', () => {
  let component: EditEtatsDemandeComponent;
  let fixture: ComponentFixture<EditEtatsDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        NgbActiveModal
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEtatsDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
