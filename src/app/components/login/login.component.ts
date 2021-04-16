import { Component, OnInit } from '@angular/core';
import {JugadorService} from '../../services/jugador.service';
import {Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	userFound:any;
  constructor(private jugadorService:JugadorService,private router:Router) { }

  ngOnInit(): void {
  }

  iniciarSesion(nickname:any,password:any){
  	  Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
      });
      Swal.showLoading();
  	this.jugadorService.getUser(nickname).subscribe(result=>{
  		this.userFound = result;
  		if(this.userFound.pass == password){
  			Swal.close();
  			this.userFound.pass = "";
  			localStorage.setItem("dataJugador",JSON.stringify(this.userFound));
  			setTimeout(() =>{
				this.router.navigate(['/menuPrincipal']);
			},500);	
  		}else{
          Swal.fire({
            title: 'ERROR!',
            text: 'Error contraseña invalida.',
            icon: 'error'
          });
  		}
  	},(err)=>{
  		  Swal.fire({
            title: 'ERROR!',
            text: 'Error, el jugador con nickname ' + nickname + ', no fue encontrado.',
            icon: 'error'
          });
  	});
  }

}
