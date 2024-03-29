import { Component, OnInit, Input } from '@angular/core';
import { InstitutoService } from '../../services/instituto.service';
import { Institutos } from '../../model/institutos.model';
import { LoginService } from '../../services/login.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { DialogDetalhesDocenteComponent } from '../../componentes/dialog-detalhes-docente/dialog-detalhes-docente.component';
import * as CryptoJS from 'crypto-js';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [InstitutoService]
})
export class HomeComponent implements OnInit {

  @Input() data;
  private secretKey = "U2FsdGVkX1/B1Ci5EgxWsURvO6PEHzNNgEgqIJ968mw="
  public dadosPuros: Array<Institutos>
  public dadosOrganizados = []
  public instituto = "../../../assets/institutos/icen.png"
  public usuario
  public param
  constructor(
    private loginService: LoginService,
    private institutoService: InstitutoService,
    public dialog: MatDialog
    ) {

   }

  ngOnInit() {
    this.usuario = CryptoJS.AES.decrypt(localStorage.getItem('isAutenticado2'), this.secretKey.trim()).toString(CryptoJS.enc.Utf8).toUpperCase()
    this.institutoService.busca(this.usuario)
    .then((resposta: any) => {
      this.dadosPuros = resposta
      this.organizarDados()
    })

    switch(this.usuario){
      case "ICEN":
        this.instituto = "INSTITUTO DE CIÊNCIAS EXATAS E DA NATUREZA";
        break;
      case "IH":
        this.instituto = "INSTITUTO DE HUMANIDADES";
        break;
      case "ICS":
        this.instituto = "INSTITUTO DE CIÊNCIAS DA SAÚDE";
        break;
      case "ICSA":
        this.instituto = "INSTITUTO DE CIÊNCIAS SOCIAIS APLICADAS";
        break;
      case "IDR":
        this.instituto = "INSTITUTO DE DESENVOLVIMENTO RURAL";
        break;
      case "IEAD":
        this.instituto = "INSTITUTO DE EDUCAÇÃO A DISTÂNCIA";
        break;
      case "IEDS":
        this.instituto = "INSTITUTO DE ENGENHARIAS E DESENVOLVIMENTO SUSTENTÁVEL";
        break;
      case "ILL":
        this.instituto = "INSTITUTO DE LINGUAGENS E LITERATURA";
        break;
      default:
        this.instituto = "";
      
    }
    
  }

  public organizarDados(){
    this.dadosOrganizados = this.dadosPuros.filter(function (a) {
      return !this[JSON.stringify(a.docente)] && (this[JSON.stringify(a.docente)] = true);
    }, Object.create(null))

  }
  public getHoras(nomeDocente: string): number{
    let x = []
    for(var i = 0; i < this.dadosPuros.length; i++){
      if(this.dadosPuros[i].docente === nomeDocente.toString()){
        
        x.push(parseInt(this.dadosPuros[i].ch))
      }
    }
    if(x.length > 0){
      return x.reduce( (accum, curr) => accum + curr )
    }else {
      return 0
    }
  }
  detalhes(nomeDocente: string): void {
    const dialogRef = this.dialog.open(DialogDetalhesDocenteComponent, {
      width: '1300px',
      data: { nomeDocente: nomeDocente, instituto: this.usuario},
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  gerarCSV(){
    if(this.dadosPuros != undefined){
      var csv = 'Edital, Ano do Edital, Processo, Projeto, Início do projeto, Fim do projeto, Docente, CH, Função, Instituto, Campus, Cotas, Sigla do Instituto\n';
 
      this.dadosPuros.forEach(function(row) {
              csv += row.edital;
              csv += ','+ row.AnoEdital;
              csv += ','+ row.processo;
              csv += ','+ row.projeto;
              csv += ','+ row.inicio_projeto;
              csv += ','+ row.final_projeto;
              csv += ','+ row.docente;
              csv += ','+ row.ch;
              csv += ','+ row.funcao;
              csv += ','+ row.Instituto;
              csv += ','+ row.Campus;
              csv += ','+ row.cotas;
              csv += ','+ row.instituto_sigla;
              csv += '\n';
      });
    
      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'dadosGerais.csv';
      hiddenElement.click();
    }else{

    }
  }

  public sair(): void{
    this.loginService.sair()
  }
}
