import { CommonModule } from '@angular/common';
import { Component, inject, ElementRef, ViewChild,  Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith, Subject } from 'rxjs';
import { injectNgControl } from 'src/app/utils/inject-ng-control';
import { NoopValueAccessorDirective } from 'src/app/utils/noop-value-accessor.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { ChangeDetectionStrategy } from '@angular/compiler';
interface Option {
  value: any;
  label: string;
}
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatAutocompleteModule, ReactiveFormsModule],
  hostDirectives: [NoopValueAccessorDirective],
})
export class AutocompleteComponent {
  ngControl = injectNgControl();

  @Input() options: Option[] = []
  @ViewChild('input') input: ElementRef<HTMLInputElement> | null = null;

  filterChange = new Subject<string>()

  filteredOptions: Observable<Option[]> = this.filterChange.pipe(
    startWith(''),
    map(filter => this.filterOptions(filter ?? ''))
  );

  ngAfterViewInit() {
    this.ngControl.control.valueChanges.pipe(startWith(this.ngControl.control.value)).subscribe(value => this.setNativeInputLabel(value))
  }
  setNativeInputLabel(value: any) {
    if (this.input) {
      const valueOption = this.options.find(option => option.value === value);
      this.input.nativeElement.value = valueOption?.label ?? '';
    }
  }

  
  filterOptions(filter: string) {
    return this.options.filter(option => option.label.toLowerCase().includes(filter.toLowerCase()));
  }



  onFilterChange(event: Event) {
    this.filterChange.next((event.target as HTMLInputElement).value)
  }

  onClear(event: MouseEvent) {
    event.stopPropagation();
    this.ngControl.control.reset()
  }
}
