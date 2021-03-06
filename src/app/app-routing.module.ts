import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* components */
import { HomeComponent } from './modules/home/components/home.component';
import { LoginComponent } from './modules/login/components/login.component';
import { ServiceComponent } from './modules/service/components/service.component';
import { BlogComponent } from './modules/blog/components/blog.component';
import { ContactComponent } from './modules/contact/components/contact/contact.component';
import { ClientComponent } from './modules/client/components/client.component';
  // client's children
  import { PetComponent } from './modules/client/components/pet/pet.component';
  import { PetVaccinationCardsComponent } from './modules/client/components/pet/pet-vaccination-cards/pet-vaccination-cards.component';
  import { PetSimpleServicesComponent } from './modules/client/components/pet/pet-simple-services/pet-simple-services.component';
  import { PetHospitalizedServicesComponent } from './modules/client/components/pet/pet-hospitalized-services/pet-hospitalized-services.component';
import { ForgotPasswordComponent } from './modules/forgot-password/components/forgot-password.component';
import { ForgotPasswordUpdateComponent } from './modules/forgot-password/components/forgot-password-update/forgot-password-update.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: HomeComponent},
  {path: 'iniciar-sesion', component: LoginComponent},
  {path: 'servicios', component: ServiceComponent},
  {path: 'blogs', component: BlogComponent},
  {path: 'contacto', component: ContactComponent},
  {path: 'cliente', component: ClientComponent, children: [
    {path: 'mascotas', component: PetComponent},
    {path: 'servicios-simples/:id', component: PetSimpleServicesComponent},
    {path: 'servicios-internado/:id', component: PetHospitalizedServicesComponent},
    {path: 'tarjetas-vacunas/:id', component: PetVaccinationCardsComponent}
  ]},
  {path: 'olvide-contrasena', component: ForgotPasswordComponent},
  {path: 'restablecer-contrasena/:verification_token', component: ForgotPasswordUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
