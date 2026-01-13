import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListBienTarifsComponent } from './list-bien-tarifs.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListBienTarifsComponent', () => {
  let component: ListBienTarifsComponent;
  let fixture: ComponentFixture<ListBienTarifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBienTarifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
