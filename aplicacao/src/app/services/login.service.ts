import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_API_AUTENTICACAO } from '../api/app.api';
import { Login } from '../model/login.model';

@Injectable()
export class LoginService {

    private url_api = URL_API_AUTENTICACAO;
    public isAutenticado: boolean;
    public user: string
    constructor(private http: Http, private router: Router){
        
    }
    //Realizar autenticação
    public autenticacao(usuario: Login): Promise<any>{
        return this.http.get(`${this.url_api}name=${usuario.usuario}&pass=${usuario.senha}`)
        .toPromise()
        .then((resposta: any) => {
            this.isAutenticado = resposta.json()
            this.user = `${usuario.usuario}`
            localStorage.setItem('isAutenticado', resposta.json())
            localStorage.setItem('user', `${usuario.usuario}`)
            this.router.navigate(['/inicio'])
        }
        );
    }

    public autenticado(): boolean{
        if(this.isAutenticado === undefined && localStorage.getItem('isAutenticado') == 'false'){
            return false;
        }
        if(this.isAutenticado === undefined && localStorage.getItem('isAutenticado') == 'true'){
            return true;
        }
    }
    public sair(): void{
        localStorage.removeItem('isAutenticado')
        this.router.navigate(['/'])
    }

    public getuser(): any{
        return this.user
    }
}

