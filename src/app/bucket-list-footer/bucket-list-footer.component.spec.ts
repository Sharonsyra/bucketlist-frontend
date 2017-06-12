import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketListFooterComponent } from './bucket-list-footer.component';

describe('BucketListFooterComponent', () => {
  let component: BucketListFooterComponent;
  let fixture: ComponentFixture<BucketListFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketListFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketListFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
