import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localeEs from "@angular/common/locales/es-PE";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common';

registerLocaleData(localeEs, 'es-PE');

import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './modules/home/components/home.component';
import { LoginComponent } from './modules/login/components/login.component';
import { BlogComponent } from './modules/blog/components/blog.component';
import { ServiceComponent } from './modules/service/components/service.component';
import { ContactComponent } from './modules/contact/components/contact/contact.component';
import { ClientComponent } from './modules/client/components/client.component';
import { PetComponent } from './modules/client/components/pet/pet.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { PetSimpleServicesComponent } from './modules/client/components/pet/pet-simple-services/pet-simple-services.component';
import { PetHospitalizedServicesComponent } from './modules/client/components/pet/pet-hospitalized-services/pet-hospitalized-services.component';
import { PetVaccinationCardsComponent } from './modules/client/components/pet/pet-vaccination-cards/pet-vaccination-cards.component';
import { ForgotPasswordComponent } from './modules/forgot-password/components/forgot-password.component';
import { ForgotPasswordUpdateComponent } from "./modules/forgot-password/components/forgot-password-update/forgot-password-update.component";
import { UnvaccinatedVaccinesComponent } from './modules/client/components/unvaccinated-vaccines/unvaccinated-vaccines.component';
import { ProfileComponent } from './modules/client/components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    BlogComponent,
    ServiceComponent,
    ContactComponent,
    ClientComponent,
    PetComponent,
    NavComponent,
    PetSimpleServicesComponent,
    PetHospitalizedServicesComponent,
    PetVaccinationCardsComponent,
    ForgotPasswordComponent,
    ForgotPasswordUpdateComponent,
    UnvaccinatedVaccinesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DatePipe,
    {provide: LOCALE_ID, useValue: 'es-PE'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
