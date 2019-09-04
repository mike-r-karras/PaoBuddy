import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourceService } from './resource.service';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { PaoEncodeService } from './pao-encode.service';
import { OutputComponent } from './output/output.component';

@NgModule({
  declarations: [
    AppComponent,
    OutputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ResourceService,
    NgxXml2jsonService,
    PaoEncodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
