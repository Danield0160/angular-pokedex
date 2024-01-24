import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionLineComponent } from './evolution-line.component';

describe('EvolutionLineComponent', () => {
  let component: EvolutionLineComponent;
  let fixture: ComponentFixture<EvolutionLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvolutionLineComponent]
    });
    fixture = TestBed.createComponent(EvolutionLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
