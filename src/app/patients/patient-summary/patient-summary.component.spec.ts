import { ComponentFixture, TestBed } from "@angular/core/testing";

import { JsonPipe } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import { PatientSummaryComponent } from "./patient-summary.component";

describe("PatientSummaryComponent", () => {
  let component: PatientSummaryComponent;
  let fixture: ComponentFixture<PatientSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientSummaryComponent, JsonPipe],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
