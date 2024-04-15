import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PictureComponent } from "./picture.component";

describe("ConsultPictureComponent", () => {
  let component: PictureComponent;
  let fixture: ComponentFixture<PictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
