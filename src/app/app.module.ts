import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localeEs from "@angular/common/locales/es-PE";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe, DecimalPipe, registerLocaleData, SlicePipe } from '@angular/common';
registerLocaleData(localeEs, 'es-PE')

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { LoginComponent } from './modules/login/components/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './modules/home/components/home.component';
import { VetComponent } from './modules/vet/components/vet.component';
import { ClientComponent } from './modules/client/components/client.component';
import { PetComponent } from './modules/pet/components/pet.component';
import { PetClinicalHistoryComponent } from './modules/pet/components/pet-clinical-history/pet-clinical-history.component';
import { PetVaccinationCardComponent } from './modules/pet/components/pet-vaccination-card/pet-vaccination-card.component';
import { VaccineComponent } from './modules/vaccine/components/vaccine.component';
import { PetSimpleServiceComponent } from './modules/pet/components/pet-simple-service/pet-simple-service.component';
import { PetHospitalizedServiceComponent } from './modules/pet/components/pet-hospitalized-service/pet-hospitalized-service.component';
import { VetEditComponent } from './modules/vet/components/vet-edit/vet-edit.component';
import { RoleComponent } from './modules/role/components/role.component';
import { ClientEditComponent } from './modules/client/components/client-edit/client-edit.component';
import { PetHospitalizedServiceEditComponent } from './modules/pet/components/pet-hospitalized-service/pet-hospitalized-service-edit/pet-hospitalized-service-edit.component';
import { BlogComponent } from './modules/blog/components/blog.component';
import { ServiceComponent } from './modules/service/components/service.component';
import { ForgotPasswordComponent } from './modules/forgot-password/components/forgot-password.component';
import { ForgotPasswordUpdateComponent } from './modules/forgot-password/components/forgot-password-update/forgot-password-update.component';
import { BlogEditComponent } from './modules/blog/components/blog-edit/blog-edit.component';
import { ServiceEditComponent } from './modules/service/components/service-edit/service-edit.component';
import { ProfileComponent } from './modules/home/components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginComponent,
    HomeComponent,
    VetComponent,
    ClientComponent,
    PetComponent,
    PetClinicalHistoryComponent,
    PetVaccinationCardComponent,
    VaccineComponent,
    PetSimpleServiceComponent,
    PetHospitalizedServiceComponent,
    VetEditComponent,
    RoleComponent,
    ClientEditComponent,
    PetHospitalizedServiceEditComponent,
    BlogComponent,
    ServiceComponent,
    ForgotPasswordComponent,
    ForgotPasswordUpdateComponent,
    BlogEditComponent,
    ServiceEditComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe,
    {provide: LOCALE_ID, useValue: 'es-PE'},
    // DecimalPipe,
    SlicePipe,
    AsyncPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
