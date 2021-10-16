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
  }
  corrigirData(data: string): any{
    const date = new Date(data).toISOString()
    return date
  }
  cancel(): void {
    this.dialogRef.close();
  }

}
