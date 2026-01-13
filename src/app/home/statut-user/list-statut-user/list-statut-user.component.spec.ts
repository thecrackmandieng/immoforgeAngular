import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListStatutUserComponent } from './list-statut-user.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListStatutUserComponent', () => {
  let component: ListStatutUserComponent;
  let fixture: ComponentFixture<ListStatutUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStatutUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
