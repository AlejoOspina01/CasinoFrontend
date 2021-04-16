import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';



import { HomeComponent } from './components/home/home.component';
import { MesacasinoComponent } from './components/mesacasino/mesacasino.component';
import { MenuprincipalComponent } from './components/menuprincipal/menuprincipal.component';
import { NavbarComponent } from './components/template/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { MispartidasComponent } from './components/mispartidas/mispartidas.component';
import { ModificarusuarioComponent } from './components/modificarusuario/modificarusuario.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MesacasinoComponent,
    MenuprincipalComponent,
    NavbarComponent,
    LoginComponent,
    MispartidasComponent,
    ModificarusuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
