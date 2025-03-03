import { TestBed } from '@angular/core/testing';

import { InputImagesService } from './input-images.service';

describe('InputImagesService', () => {
  let service: InputImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
