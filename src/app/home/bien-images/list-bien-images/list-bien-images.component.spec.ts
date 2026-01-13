import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListBienImagesComponent } from './list-bien-images.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListBienImagesComponent', () => {
  let component: ListBienImagesComponent;
  let fixture: ComponentFixture<ListBienImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBienImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
