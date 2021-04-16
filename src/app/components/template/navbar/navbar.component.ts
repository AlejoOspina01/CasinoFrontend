import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
//Services
import {JugadorService} from '../../../services/jugador.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dataJugador = JSON.parse(localStorage.getItem('dataJugador'));
  newData:any;

  constructor(private router:Router,private jugadorService:JugadorService) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
  	localStorage.removeItem("dataJugador");
        this.router.navigate(['/']);
  }

  cambiarImagen(rutaimagen:any){
    this.dataJugador.rutaimagen = rutaimagen; 
  }

  eliminarCuenta(){
    this.jugadorService.eliminarCuenta(this.dataJugador.nickname).subscribe(result=>{
      localStorage.removeItem("dataJugador");
      this.router.navigate(['/']);      
    },(err)=>{
          Swal.fire({
            title: 'ERROR!',
            text: 'Error, .' + err.error.text,
            icon: 'error'
          });  
    });
  }

  actualizarDatos(nicknamenew:any,passwordnew:any){
    this.newData = {
      nickname:this.dataJugador.nickname,
      nicknamenew:nicknamenew,
      passwordnew:passwordnew,
      rutaimagennew:this.dataJugador.rutaimagen
    };
    if(passwordnew != "" && nicknamenew != ""){
      this.jugadorService.actualizarJugador(this.newData).subscribe(result=>{
        localStorage.setItem("dataJugador",JSON.stringify(this.dataJugador));
            Swal.fire({
              title: 'Datos actualizados!',
              text: 'Se han actualizado los datos correctamente.',
              icon: 'success'
            });      
      },(err)=>{

      });
    }else{
          Swal.fire({
            title: 'ERROR!',
            text: 'Error, por favor rellena el formulario con datos validos.',
            icon: 'error'
          });      
    }

  }

}
