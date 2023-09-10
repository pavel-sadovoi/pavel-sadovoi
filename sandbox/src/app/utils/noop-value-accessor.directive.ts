import { Directive } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Directive({
    standalone: true,
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: NoopValueAccessorDirective,
      },
    ],
  })
  export class NoopValueAccessorDirective implements ControlValueAccessor {
    writeValue(obj: any): void {}
    registerOnChange(fn: any): void {}
    registerOnTouched(fn: any): void {}
  }