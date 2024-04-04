import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PatientFileComponent } from "./patient-file.component";

describe("PatientFicheComponent", () => {
  let component: PatientFileComponent;
  let fixture: ComponentFixture<PatientFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientFileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
