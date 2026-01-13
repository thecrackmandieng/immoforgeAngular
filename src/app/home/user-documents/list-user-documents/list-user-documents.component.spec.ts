import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListUserDocumentsComponent } from './list-user-documents.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListUserDocumentsComponent', () => {
  let component: ListUserDocumentsComponent;
  let fixture: ComponentFixture<ListUserDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
