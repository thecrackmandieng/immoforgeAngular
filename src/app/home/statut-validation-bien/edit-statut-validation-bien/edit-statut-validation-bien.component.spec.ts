import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditStatutValidationBienComponent } from './edit-statut-validation-bien.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('EditStatutValidationBienComponent', () => {
  let component: EditStatutValidationBienComponent;
  let fixture: ComponentFixture<EditStatutValidationBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        NgbActiveModal
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStatutValidationBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
