import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { PatientLoadingComponent } from "./patient-loading.component";

describe("PatientLoadingComponent", () => {
  let component: PatientLoadingComponent;
  let fixture: ComponentFixture<PatientLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientLoadingComponent],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
