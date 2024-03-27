import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RouterLink, RouterModule } from "@angular/router";
import routes from "../../app.routes";
import { PatientsHomeComponent } from "./patients-home.component";

describe("PatientsHomeComponent", () => {
  let component: PatientsHomeComponent;
  let fixture: ComponentFixture<PatientsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsHomeComponent, RouterLink, RouterModule.forRoot(routes)]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
