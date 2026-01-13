import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPlansTarifairesComponent } from './edit-plans-tarifaires.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('EditPlansTarifairesComponent', () => {
  let component: EditPlansTarifairesComponent;
  let fixture: ComponentFixture<EditPlansTarifairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        NgbActiveModal
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPlansTarifairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
