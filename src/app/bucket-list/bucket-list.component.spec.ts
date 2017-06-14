import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { BucketListComponent } from './bucket-list.component';
import {Bucket} from './bucket';

describe('BucketListComponent', () => {
  let component: BucketListComponent;
  let fixture: ComponentFixture<BucketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
