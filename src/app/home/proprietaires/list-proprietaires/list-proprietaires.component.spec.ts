import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProprietairesComponent } from './list-proprietaires.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListProprietairesComponent', () => {
  let component: ListProprietairesComponent;
  let fixture: ComponentFixture<ListProprietairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProprietairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
