import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PatientFicheComponent } from "./patient-fiche.component";

describe("PatientFicheComponent", () => {
  let component: PatientFicheComponent;
  let fixture: ComponentFixture<PatientFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientFicheComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
