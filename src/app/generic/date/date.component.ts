import { Component, Input } from "@angular/core";

export const InvalidDate = "Invalid date";

export function normalizeDate(d: Date | string | undefined): Date | undefined {
  if (d == undefined) {
    return undefined;
  }

  if (d instanceof Date) {
    return d;
  }

  return new Date(d);
}

export function date2HumanString(value: Date | undefined): string {
  if (value == null) {
    return "";
  }

  if (isNaN(value.getFullYear())) {
    return InvalidDate;
  }

  // Thanks to https://stackoverflow.com/a/67715865/1954789
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(value);
}

@Component({
  selector: "app-date",
  standalone: true,
  imports: [],
  template: "{{ representation }}"
})
export class DateComponent {
  @Input()
  value?: Date | string;

  get representation(): string {
    return date2HumanString(normalizeDate(this.value));
  }
}
