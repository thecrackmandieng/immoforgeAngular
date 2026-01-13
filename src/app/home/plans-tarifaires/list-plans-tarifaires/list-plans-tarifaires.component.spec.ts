import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPlansTarifairesComponent } from './list-plans-tarifaires.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListPlansTarifairesComponent', () => {
  let component: ListPlansTarifairesComponent;
  let fixture: ComponentFixture<ListPlansTarifairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlansTarifairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
