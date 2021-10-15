import { CanActivate } from '@angular/router';
import { Injectable} from '@angular/core';
import { LoginService } from './login.service';

@Injectable()
export class AutenticacaoGuard implements CanActivate {

    constructor(private loginService: LoginService){}

    canActivate(): boolean{
        console.log(this.loginService.getuser())
        return this.loginService.autenticado()
    }
}