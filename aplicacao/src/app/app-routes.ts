import { Routes } from "@angular/router";

import { AutenticacaoGuard } from './services/autenticacaoGuard.service';

import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";

export const ROUTES: Routes = [
    {path: "", component: LoginComponent},
    {path: "inicio", component: HomeComponent, canActivate: [ AutenticacaoGuard ]}
    

]