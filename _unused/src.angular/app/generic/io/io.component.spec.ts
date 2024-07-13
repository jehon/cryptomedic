import { ComponentFixture, TestBed } from "@angular/core/testing";

import { IoComponent } from "./io.component";

describe("IoStringComponent", () => {
  let component: IoComponent;
  let fixture: ComponentFixture<IoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IoComponent);
    component = fixture.componentInstance;
    component.type = "string";
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
