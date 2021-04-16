import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import {HomeComponent} from './components/home/home.component';
import {MesacasinoComponent} from './components/mesacasino/mesacasino.component';
import {MenuprincipalComponent} from './components/menuprincipal/menuprincipal.component';
import {LoginComponent} from './components/login/login.component';
import {ModificarusuarioComponent} from './components/modificarusuario/modificarusuario.component';
import {MispartidasComponent} from './components/mispartidas/mispartidas.component';


const routes: Routes = [
{path:'registrarse',component: HomeComponent},
{path:'mispartidas',component: MispartidasComponent},
{path:'modificarUser',component: ModificarusuarioComponent},
{path:'mesaCasino',component: MesacasinoComponent},
{path:'menuPrincipal',component: MenuprincipalComponent},
{path:'',component:  LoginComponent},
{path:'**',component:  LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
