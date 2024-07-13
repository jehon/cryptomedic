import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConsultClubfootComponent } from "./consult-clubfoot.component";

describe("ConsultClubfootComponent", () => {
  let component: ConsultClubfootComponent;
  let fixture: ComponentFixture<ConsultClubfootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultClubfootComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultClubfootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
