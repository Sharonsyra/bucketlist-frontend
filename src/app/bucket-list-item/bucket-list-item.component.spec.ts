import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketListItemComponent } from './bucket-list-item.component';

describe('BucketListItemComponent', () => {
  let component: BucketListItemComponent;
  let fixture: ComponentFixture<BucketListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
