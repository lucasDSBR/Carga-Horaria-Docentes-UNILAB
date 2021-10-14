import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs';

import { URL_API_AUTENTICACAO } from '../api/app.api';
import { Login } from '../model/login.model';
@Injectable()
export class LoginService {
    private url_api = URL_API_AUTENTICACAO;
    constructor(private http: Http){
        
    }
    //Realizar autenticação
    public autenticacao(usuario: Login): Promise<any>{
        return this.http.get(`${this.url_api}name=${usuario.usuario}&pass=${usuario.senha}`)
        .toPromise()
        .then((resposta: any) => resposta.json());
    }
}

