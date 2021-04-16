import { Component, OnInit } from '@angular/core';
import {JugadorService} from '../../services/jugador.service';
import {Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	jugadorData:any;
	valcorrecto:any;
  msg:any;

  constructor(private jugadorService:JugadorService,private router:Router) { }

  ngOnInit(): void {
  }

  registrarJugador(nickname:any,password){
  	this.jugadorData={
  		'nickname':nickname,
      'password':password,
      'rutaimagen':"assets/img/profile.png",
      'saldo':15000
  	};
  	this.jugadorService.registrarJugador(this.jugadorData).subscribe(result=>{
      this.valcorrecto = 1;
      this.jugadorData.password="";
      localStorage.setItem("dataJugador",JSON.stringify(this.jugadorData));
      setTimeout(() =>{
        this.router.navigate(['/menuPrincipal']);
      },1000);  		
  	},(err)=>{
  		this.valcorrecto = 2;
      this.msg = err.error.text;
  	});
  }

}
