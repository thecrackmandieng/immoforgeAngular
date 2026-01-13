import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListBienOptionComponent } from './list-bien-option.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListBienOptionComponent', () => {
  let component: ListBienOptionComponent;
  let fixture: ComponentFixture<ListBienOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBienOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
