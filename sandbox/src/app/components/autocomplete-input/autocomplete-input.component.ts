import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

interface Option {
  value: any;
  label: string;
}

@Component({
  selector: 'app-autocomplete-input',
  template: `
      <input  [formControl]="search" >
    `,
  styles: [`
      div {
        display: flex;
      }
      /* input {
        border: none;
        background: none;
        padding: 0;
        outline: none;
        font: inherit;
        text-align: center;
        color: currentColor;
      } */
    `],
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatAutocompleteModule, ReactiveFormsModule],

})
export class AutocompleteInputComponent {
  search = new FormControl('')

  _value: any;
  @Input() options: Option[] = []

  @Input()
  set value(value: any) {
    this._value = value;
    const valueOption = this.options.find(option => option.value === value);
    this.search.setValue(valueOption?.label ?? '')
  }

  get value(): any {
    return this._value;
  }

  constructor() {

  }
}
