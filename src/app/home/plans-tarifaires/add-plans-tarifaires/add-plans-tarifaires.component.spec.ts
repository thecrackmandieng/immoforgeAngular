import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPlansTarifairesComponent } from './add-plans-tarifaires.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('AddPlansTarifairesComponent', () => {
  let component: AddPlansTarifairesComponent;
  let fixture: ComponentFixture<AddPlansTarifairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        NgbActiveModal
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlansTarifairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
