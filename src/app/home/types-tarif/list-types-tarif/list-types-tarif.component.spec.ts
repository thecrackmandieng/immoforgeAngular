import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTypesTarifComponent } from './list-types-tarif.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListTypesTarifComponent', () => {
  let component: ListTypesTarifComponent;
  let fixture: ComponentFixture<ListTypesTarifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypesTarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
