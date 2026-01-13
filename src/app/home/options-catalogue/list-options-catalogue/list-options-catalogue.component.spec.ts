import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOptionsCatalogueComponent } from './list-options-catalogue.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListOptionsCatalogueComponent', () => {
  let component: ListOptionsCatalogueComponent;
  let fixture: ComponentFixture<ListOptionsCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOptionsCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
