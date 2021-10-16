import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_API_AUTENTICACAO } from '../api/app.api';
import { Login } from '../model/login.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as CryptoJS from 'crypto-js';
import { copyStyles } from '@angular/animations/browser/src/util';
@Injectable()
export class LoginService {

    private url_api = URL_API_AUTENTICACAO;
    public isAutenticado: boolean;
    public user: string
    public secretKey = "U2FsdGVkX1/B1Ci5EgxWsURvO6PEHzNNgEgqIJ968mw="
    constructor(private http: Http, private router: Router){
        
    }
    public login(logindata: Login): Observable<any>{
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(
            this.url_api,
            JSON.stringify(logindata),
            new RequestOptions({headers: headers})
            ).map((resposta: any) => {
                this.isAutenticado = resposta.json()
                this.user = `${logindata.name}`
                localStorage.setItem('isAutenticado', resposta.json())
                localStorage.setItem('isAutenticado2', `${CryptoJS.AES.encrypt(logindata.name, this.secretKey.trim()).toString()}`)
                this.router.navigate(['/inicio'])
            })
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

