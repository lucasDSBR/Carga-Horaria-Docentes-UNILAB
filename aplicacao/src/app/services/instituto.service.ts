import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { URL_API_INSTITUTO } from '../api/app.api';
import { Instituto } from '../model/instituto.model';
//import { URL_API_INSTITUTO_USUARIO } from '../api/app.api';
//import { Subject } from 'rxjs';
//import { Observable } from 'rxjs/Observable';
//import { Login } from '../model/login.model';
@Injectable()
export class InstitutoService {
    private url_api = URL_API_INSTITUTO;
    constructor(private http: Http){
        
    }

    public busca(instituto: Instituto): Promise<any> {
        var formData: any = new FormData();
        formData.append("instituto_sigla", instituto);
        return this.http.post(this.url_api, formData)
        .toPromise()
        .then((resposta: any) => resposta.json())
    }

    public buscaInstitudoUsuario(instituto: string, docente: string){
        var formData: any = new FormData();
        formData.append("instituto_sigla", instituto);
        formData.append("docente", docente);
        return this.http.post(this.url_api, formData)
        .toPromise()
        .then((resposta: any) => resposta.json())
        /*
        return this.http.get(`${this.url_api2}${instituto}&docente=${docente}`)
        .toPromise()
        .then((resposta: any) => resposta.json())*/
    }
}

