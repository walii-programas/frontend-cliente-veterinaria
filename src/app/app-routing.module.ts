import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* components */
import { LoginComponent } from "./modules/login/components/login.component";
import { HomeComponent } from "./modules/home/components/home.component";
  // home's children
  import { ClientComponent } from './modules/client/components/client.component';
  import { PetComponent } from './modules/pet/components/pet.component';

    import { PetClinicalHistoryComponent } from './modules/pet/components/pet-clinical-history/pet-clinical-history.component';
    import { PetVaccinationCardComponent } from './modules/pet/components/pet-vaccination-card/pet-vaccination-card.component';

  import { VetComponent } from './modules/vet/components/vet.component';
  import { VaccineComponent } from './modules/vaccine/components/vaccine.component';

  import { PetSimpleServiceComponent } from './modules/pet/components/pet-simple-service/pet-simple-service.component';
  import { PetHospitalizedServiceComponent } from './modules/pet/components/pet-hospitalized-service/pet-hospitalized-service.component';
  import { VetEditComponent } from './modules/vet/components/vet-edit/vet-edit.component';
  import { RoleComponent } from "./modules/role/components/role.component";
  import { ClientEditComponent } from './modules/client/components/client-edit/client-edit.component';
  import { PetHospitalizedServiceEditComponent } from './modules/pet/components/pet-hospitalized-service/pet-hospitalized-service-edit/pet-hospitalized-service-edit.component';
  import { RoleGuard } from './global/guards/role.guard';
  import { BlogComponent } from './modules/blog/components/blog.component';
  import { ServiceComponent } from './modules/service/components/service.component';
  import { ForgotPasswordComponent } from './modules/forgot-password/components/forgot-password.component';
  import { ForgotPasswordUpdateComponent } from './modules/forgot-password/components/forgot-password-update/forgot-password-update.component';
  import { BlogEditComponent } from './modules/blog/components/blog-edit/blog-edit.component';

/* guards */
import { AuthGuard } from './global/guards/auth.guard';
import { ServiceEditComponent } from './modules/service/components/service-edit/service-edit.component';
import { ProfileComponent } from './modules/home/components/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, children: [
    {path: 'clientes', component: ClientComponent},
    {path: 'mascotas/:id', component: PetComponent},
    {path: 'historial-clinico/:id', component: PetClinicalHistoryComponent},
    {path: 'tarjeta-vacunas/:id', component: PetVaccinationCardComponent},
    {path: 'servicios-simples/:id', component: PetSimpleServiceComponent},
    {path: 'servicios-hospitalizacion/:id', component: PetHospitalizedServiceComponent},
    {path: 'vacunas', component: VaccineComponent, canActivate: [RoleGuard]},
    {path: 'veterinarios', component: VetComponent, canActivate: [RoleGuard]},
    {path: 'editar-veterinario/:id', component: VetEditComponent},
    {path: 'editar-cliente/:id', component: ClientEditComponent},
    {path: 'editar-servicio-internado/:id', component: PetHospitalizedServiceEditComponent},
    {path: 'roles', component: RoleComponent, canActivate: [RoleGuard]},
    {path: 'blog', component: BlogComponent, canActivate: [RoleGuard]},
    {path: 'servicios', component: ServiceComponent, canActivate: [RoleGuard]},
    {path: 'editar-blog/:id', component: BlogEditComponent},
    {path: 'editar-servicio/:id', component: ServiceEditComponent},
    {path: 'mi-perfil', component: ProfileComponent}
  ], canActivate: [AuthGuard]},
  {path: 'olvide-contrasena', component: ForgotPasswordComponent},
  {path: 'restablecer-contrasena/:verification_token', component: ForgotPasswordUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
