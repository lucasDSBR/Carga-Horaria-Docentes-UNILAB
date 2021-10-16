import {Component, OnInit, Inject} from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { InstitutoService } from '../../services/instituto.service';
import { Institutos } from '../../model/institutos.model';

@Component({
  selector: 'app-dialog-detalhes-docente',
  templateUrl: './dialog-detalhes-docente.component.html',
  styleUrls: ['./dialog-detalhes-docente.component.css'],
  providers: [InstitutoService]
})
export class DialogDetalhesDocenteComponent implements OnInit {
  public dataUser: Array<Institutos>
  constructor(
    private institutoService: InstitutoService,
    public dialogRef: MatDialogRef<DialogDetalhesDocenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {nomeDocente: string, instituto: string}
  ) { }

  ngOnInit() {
    this.institutoService.buscaInstitudoUsuario(this.data.instituto, this.data.nomeDocente)
    .then((resposta: any) => {
      this.dataUser = resposta
    })
    console.log(this.dataUser)
  }
  corrigirData(data: string): any{
    const date = new Date(data).toISOString()
    return date
  }
  cancel(): void {
    this.dialogRef.close();
  }

  gerarCSV(){
    if(this.dataUser != undefined){
      var csv = 'Edital, Ano do Edital, Processo, Projeto, Início do projeto, Fim do projeto, Docente, CH, Função, Instituto, Campus, Cotas, Sigla do Instituto\n';
 
      this.dataUser.forEach(function(row) {
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
      hiddenElement.download = this.data.nomeDocente+'.csv';
      hiddenElement.click();
    }else{

    }
  }

}
