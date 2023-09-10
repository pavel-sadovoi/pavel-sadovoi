import { CommonModule } from '@angular/common';
import { Component, inject, ElementRef, ViewChild,  Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith, Subject } from 'rxjs';
import { injectNgControl } from 'src/app/utils/inject-ng-control';
import { NoopValueAccessorDirective } from 'src/app/utils/noop-value-accessor.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import {MatDividerModule} from '@angular/material/divider';
import {A11yModule} from '@angular/cdk/a11y';
interface Option {
  value: any;
  label: string;
}
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: true,
  imports: [A11yModule, CommonModule, MatInputModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatSelectModule, ReactiveFormsModule],
  hostDirectives: [NoopValueAccessorDirective],
})
export class SelectComponent {
  ngControl = injectNgControl();

  @Input() options: Option[] = []
 
  filterChange = new Subject<string>()

  filteredOptions: Observable<Option[]> = this.filterChange.pipe(
    startWith(''),
    map(filter => this.filterOptions(filter ?? ''))
  );


  
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
