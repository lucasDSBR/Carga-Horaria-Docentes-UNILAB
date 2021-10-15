import { Component, OnInit, Input } from '@angular/core';
import { InstitutoService } from '../../services/instituto.service';
import { Institutos } from '../../model/institutos.model';
import { LoginService } from '../../services/login.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [InstitutoService]
})
export class HomeComponent implements OnInit {

  @Input() data;
  private secretKey = "U2FsdGVkX1/B1Ci5EgxWsURvO6PEHzNNgEgqIJ968mw="
  public dadosPuro: Array<Institutos>
  public dadosOrganizados = []
  public usuario
  public param
  constructor(
    private loginService: LoginService,
    private institutoService: InstitutoService
    ) {

   }

  ngOnInit() {
    this.param = CryptoJS.AES.decrypt(localStorage.getItem('isAutenticado3'), this.secretKey.trim()).toString(CryptoJS.enc.Utf8)
    this.usuario = CryptoJS.AES.decrypt(localStorage.getItem('isAutenticado2'), this.secretKey.trim()).toString(CryptoJS.enc.Utf8).toUpperCase()
    this.institutoService.busca(this.param+this.usuario)
    .then((resposta: any) => {
      this.dadosPuro = resposta
    })
  }

  public organizarDados(){
  }

  public sair(): void{
    this.loginService.sair()
  }
}
