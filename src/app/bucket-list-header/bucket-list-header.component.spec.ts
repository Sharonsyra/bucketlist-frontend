import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketListHeaderComponent } from './bucket-list-header.component';

describe('BucketListHeaderComponent', () => {
  let component: BucketListHeaderComponent;
  let fixture: ComponentFixture<BucketListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
