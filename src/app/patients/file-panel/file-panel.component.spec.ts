import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FilePanelComponent } from "./file-panel.component";

describe("PanelComponent", () => {
  let component: FilePanelComponent;
  let fixture: ComponentFixture<FilePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FilePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
