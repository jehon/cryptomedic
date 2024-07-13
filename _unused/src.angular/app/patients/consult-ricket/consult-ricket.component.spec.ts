import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConsultRicketComponent } from "./consult-ricket.component";

describe("ConsultRicketComponent", () => {
  let component: ConsultRicketComponent;
  let fixture: ComponentFixture<ConsultRicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultRicketComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultRicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
