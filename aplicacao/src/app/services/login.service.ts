import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_API_AUTENTICACAO } from '../api/app.api';
import { Login } from '../model/login.model';
import * as CryptoJS from 'crypto-js';
@Injectable()
export class LoginService {

    private url_api = URL_API_AUTENTICACAO;
    public isAutenticado: boolean;
    public user: string
    public secretKey = "U2FsdGVkX1/B1Ci5EgxWsURvO6PEHzNNgEgqIJ968mw="
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
            localStorage.setItem('isAutenticado2', `${CryptoJS.AES.encrypt(usuario.usuario, this.secretKey.trim()).toString()}`)
            localStorage.setItem('isAutenticado3', `${CryptoJS.AES.encrypt("ch_docentes.php?instituto_sigla=", this.secretKey.trim()).toString()}`)
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
        localStorage.removeItem('isAutenticado2')
        this.router.navigate(['/'])
    }

}

