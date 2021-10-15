import { Component, OnInit, Input } from '@angular/core';
import { InstitutoService } from '../../services/instituto.service';
import { Institutos } from '../../model/institutos.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [InstitutoService]
})
export class HomeComponent implements OnInit {

  @Input() data;

  public dadosPuro: Array<Institutos>
  public dadosOrganizados = []
  
  constructor(private institutoService: InstitutoService) {

   }

  ngOnInit() {
    if(this.data.resposta){
      this.buscarPesquisadoresInstituto(this.data.dataUser.usuario.toUpperCase())
    }
  }
  
  public buscarPesquisadoresInstituto(data){
    this.institutoService.busca(data).then((resposta: Array<Institutos>) => {
      this.dadosPuro = resposta
      this.organizarDados()
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

  public organizarDados(){
  }

}
