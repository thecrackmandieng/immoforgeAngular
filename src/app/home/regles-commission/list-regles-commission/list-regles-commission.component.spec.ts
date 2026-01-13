import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListReglesCommissionComponent } from './list-regles-commission.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListReglesCommissionComponent', () => {
  let component: ListReglesCommissionComponent;
  let fixture: ComponentFixture<ListReglesCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReglesCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
