import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './shared/services/basic-store/user.service';
import { FilterService } from './shared/services/filter.service';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectComponent } from './components/select/select.component';
import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [AutocompleteInputComponent,
    SelectComponent,
    AutocompleteComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
