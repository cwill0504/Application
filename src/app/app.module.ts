import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApplicationService } from './service/application.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationComponent } from './application/application.component';
import { MainComponent } from './main/main.component';
import { IdentificationTypesComponent } from './component/identification-types/identification-types.component';



@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    MainComponent,
    IdentificationTypesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
