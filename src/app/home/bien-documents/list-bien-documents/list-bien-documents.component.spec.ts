import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListBienDocumentsComponent } from './list-bien-documents.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListBienDocumentsComponent', () => {
  let component: ListBienDocumentsComponent;
  let fixture: ComponentFixture<ListBienDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBienDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
