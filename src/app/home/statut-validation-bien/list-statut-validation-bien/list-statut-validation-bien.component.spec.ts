import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListStatutValidationBienComponent } from './list-statut-validation-bien.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListStatutValidationBienComponent', () => {
  let component: ListStatutValidationBienComponent;
  let fixture: ComponentFixture<ListStatutValidationBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStatutValidationBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
