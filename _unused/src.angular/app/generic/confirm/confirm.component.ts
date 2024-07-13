import { Component } from "@angular/core";

export function doNothing() {}

@Component({
  selector: "app-confirm",
  standalone: true,
  imports: [],
  templateUrl: "./confirm.component.html",
  styleUrl: "./confirm.component.css"
})
export class ConfirmComponent {
  text: string = "";
  visible: boolean = false;

  #resolve: () => void = () => {};
  #reject: () => void = () => {};

  show(text: string): Promise<void> {
    this.visible = true;
    this.text = text;
    return new Promise<void>((resolve, reject) => {
      this.#resolve = resolve;
      this.#reject = reject;
    });
  }

  cancel() {
    this.visible = false;
    this.#reject();
  }

  confirm() {
    this.visible = false;
    this.#resolve();
  }
}
