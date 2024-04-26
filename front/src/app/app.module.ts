import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GroupeComponent } from './groupe/groupe.component';
import { GroupeModule } from './groupe/groupe.module';

@NgModule({
  declarations: [
    AppComponent,
    GroupeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GroupeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
