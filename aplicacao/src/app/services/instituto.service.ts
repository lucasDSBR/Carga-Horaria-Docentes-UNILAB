import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs';

import { URL_API_INSTITUTO } from '../api/app.api';
import { Login } from '../model/login.model';
@Injectable()
export class InstitutoService {
    private url_api = URL_API_INSTITUTO;
    constructor(private http: Http){
        
    }
    //Realizar autenticação
    public busca(instituto: string): Promise<any>{
        return this.http.get(`${this.url_api}=${instituto}`)
        .toPromise()
        .then((resposta: any) => resposta.json());
    }
}

