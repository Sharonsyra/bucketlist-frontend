import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BucketListItemComponent } from './bucket-list-item.component';
import {Item} from '../bucket-list-item/item';

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
    component.items = [new Item({ id: 1, name: 'Test' })];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
