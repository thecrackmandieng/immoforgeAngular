import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTypesBienComponent } from './list-types-bien.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListTypesBienComponent', () => {
  let component: ListTypesBienComponent;
  let fixture: ComponentFixture<ListTypesBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypesBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
