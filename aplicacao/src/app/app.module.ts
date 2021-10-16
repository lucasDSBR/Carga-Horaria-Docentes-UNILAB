import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app-routes';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {MatDialogModule} from '@angular/material/dialog';
import {MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RodapeComponent } from './pages/rodape/rodape.component';
import { AutenticacaoGuard } from './services/autenticacaoGuard.service';
import { LoginService } from './services/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogDetalhesDocenteComponent } from './componentes/dialog-detalhes-docente/dialog-detalhes-docente.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    RodapeComponent,
    DialogDetalhesDocenteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [DialogDetalhesDocenteComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR'}, AutenticacaoGuard, LoginService, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
