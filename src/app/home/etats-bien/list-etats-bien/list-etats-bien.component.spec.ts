import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListEtatsBienComponent } from './list-etats-bien.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListEtatsBienComponent', () => {
  let component: ListEtatsBienComponent;
  let fixture: ComponentFixture<ListEtatsBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEtatsBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
