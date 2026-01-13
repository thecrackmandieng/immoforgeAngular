import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddStatutValidationBienComponent } from './add-statut-validation-bien.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('AddStatutValidationBienComponent', () => {
  let component: AddStatutValidationBienComponent;
  let fixture: ComponentFixture<AddStatutValidationBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        NgbActiveModal
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStatutValidationBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
