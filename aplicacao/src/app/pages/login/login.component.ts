import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../model/login.model';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public alertaDadosIncorretos = false
  public isAutenticado = false;
  public data = {}
  private formulario: FormGroup = new FormGroup({
    'Usuario': new FormControl(null, [Validators.required]),
    'Senha': new FormControl(null, [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    public router: Router
    ) {
     }

  ngOnInit() {
  }
  public confirmarCadastro(): void{
    if(this.formulario.status === "INVALID"){
      this.formulario.get('Usuario').markAsTouched()
      this.formulario.get('Senha').markAsTouched()

    }else{
      let dataUser: Login = new Login(
        this.formulario.value.Usuario, 
        this.formulario.value.Senha
      )
      this.loginService.login(dataUser)
      .subscribe((dataCadastro: any) => {
        console.log(dataCadastro)
        this.isAutenticado = dataCadastro
        if(dataCadastro){
          this.listaPesquisadores(dataUser, dataCadastro)
        }else{
          this.alertaDadosIncorretos = true
        }
      })
      
      
      /*then((resposta: any) =>{
        this.isAutenticado = resposta
        if(resposta){
          this.listaPesquisadores(dataUser, resposta)
        }else{
          this.alertaDadosIncorretos = true
        }
      })
      .catch((err: any) =>{
        console.log(err)
      })
      */
    }
  }
  public listaPesquisadores(dataUser, resposta){
    this.data = {dataUser, resposta}
  }

}
