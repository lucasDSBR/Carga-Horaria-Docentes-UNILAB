import {Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { InstitutoService } from '../../services/instituto.service';
import { Institutos } from '../../model/institutos.model';
import {ExcelService} from '../../services/excel.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-dialog-detalhes-docente',
  templateUrl: './dialog-detalhes-docente.component.html',
  styleUrls: ['./dialog-detalhes-docente.component.css'],
  providers: [InstitutoService, ExcelService]
})
export class DialogDetalhesDocenteComponent implements OnInit {
  public dataUser: Array<Institutos>
  constructor(
    private excelService:ExcelService,
    private institutoService: InstitutoService,
    public dialogRef: MatDialogRef<DialogDetalhesDocenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {nomeDocente: string, instituto: string}
  ) { }

  ngOnInit() {
    this.institutoService.buscaInstitudoUsuario(this.data.instituto, this.data.nomeDocente)
    .then((resposta: any) => {
      this.dataUser = resposta
    })
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
      hiddenElement.baseURI
    }else{

    }
  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.dataUser, this.dataUser[0].docente);
  }

  captureScreen()  
  {  
    var doc = new jsPDF('l', 'pt');
    var rows = [];
    const head = [[' -- ','Ano Edital', 'Edital', 'Processo', 'Cotas', 'Projeto', 'Carga Horária', 'Função', 'UF', 'Instituto', 'Início do projeto', 'Fim do projeto']]
    for(var key in this.dataUser){
        var temp = [
          key, 
          this.dataUser[key].AnoEdital, 
          this.dataUser[key].edital,
          this.dataUser[key].processo,
          this.dataUser[key].cotas,
          this.dataUser[key].projeto,
          this.dataUser[key].ch,
          this.dataUser[key].funcao,
          this.dataUser[key].Campus,
          this.dataUser[key].Instituto,
          this.dataUser[key].inicio_projeto,
          this.dataUser[key].final_projeto
        ];
        rows.push(temp)
    }


    doc.text("Docente: "+this.data.nomeDocente, 10, 30)
    autoTable(doc, {
      head: head,
      body: rows,
      didDrawCell: (data) => { },
    });
    doc.save(this.data.nomeDocente+'.pdf');
  }  

}
