import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConsultOtherComponent } from "./consult-other.component";

describe("ConsultOtherComponent", () => {
  let component: ConsultOtherComponent;
  let fixture: ComponentFixture<ConsultOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultOtherComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
