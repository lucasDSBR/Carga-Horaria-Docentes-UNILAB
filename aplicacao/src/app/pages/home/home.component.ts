import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Login } from '../../model/login.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userWithRole: Login;
  constructor(public activatedRoute: ActivatedRoute) {

   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userWithRole.usuario = JSON.parse(params['user']);
      console.log(this.userWithRole.usuario)
    });
  }

}
