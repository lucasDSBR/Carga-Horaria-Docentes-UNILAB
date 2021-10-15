import { Component, OnInit, Input } from '@angular/core';
import { InstitutoService } from '../../services/instituto.service';
import { Institutos } from '../../model/institutos.model';
import { LoginService } from '../../services/login.service';
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
  public usuario
  constructor(private loginService: LoginService) {

   }

  ngOnInit() {
    this.usuario = localStorage.getItem('user')
  }

  public organizarDados(){
  }

  public sair(): void{
    this.loginService.sair()
  }
}
