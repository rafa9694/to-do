import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponentModule } from './pages/home/home.component.module';
import { ListComponentModule } from './pages/list/list.component.module';
import { ListItemComponentModule } from './components/list-item/list-item.component.module';
import { DialogModule } from './components/dialog/dialog.component.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeComponentModule,
    ListComponentModule,
    ListItemComponentModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
