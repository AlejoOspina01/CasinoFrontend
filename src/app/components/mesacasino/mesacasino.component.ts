import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

//Services
import {JugadorService} from '../../services/jugador.service';
import {PartidaService} from '../../services/partida.service';

@Component({
  selector: 'app-mesacasino',
  templateUrl: './mesacasino.component.html',
  styleUrls: ['./mesacasino.component.css']
})
export class MesacasinoComponent implements OnInit {

	dataJugador = JSON.parse(localStorage.getItem('dataJugador'));
	colorsel="";
	selverde="";
	selrojo="";
	selnegro="";
	sel11="";
	sel19="";
	colorsistema="";
	dineroApostado=0;
	dineroPerdido=0;
	porcentajesel:any;
	activarGif=false;
	dineroGanado=0;
	dineroActual = this.dataJugador.saldo;
	resultado:any;
	newSaldo:any;
	newPartida:any;

  constructor(private jugadorService:JugadorService,private partidaService:PartidaService) { }

  ngOnInit(): void {
  }

  colorSeleccionado(color:any){
  	this.colorsel = color;
  	switch (color) {
  		case "Verde":
  			this.selrojo = "";
  			this.selnegro = "";
  			this.selverde = "border: 5px solid #3f51b5;";
  			break;
  		case "Rojo":
  			this.selverde = "";
  			this.selnegro = "";
  			this.selrojo = "border: 5px solid #3f51b5;";
  			break;
  		case "Negro":
  			this.selverde = "";
  			this.selrojo = "";
  			this.selnegro = "border: 5px solid #3f51b5;";
  			break;  			  			
  		
  		default:
  			// code...
  			break;
  	}
  }

  dineroSeleccionado(porcentaje:any){
  	this.porcentajesel = porcentaje;
  	if(this.dataJugador.saldo <= 1000){
  		this.dineroApostado = this.dataJugador.saldo;
  		switch (porcentaje) {
  			case 0.11:
  				this.sel19 = "";
  				this.sel11 = "border: 5px solid #3f51b5;";
  				break;
  			case 0.19:
  				this.sel19 = "border: 5px solid #3f51b5;";
  				this.sel11 = "";
  				break;  			
  			default:
  				// code...
  				break;
  		}
  	}else{
  		this.dineroApostado = Math.floor(this.dataJugador.saldo * porcentaje);	
  		switch (porcentaje) {
  			case 0.11:
  				this.sel19 = "";
  				this.sel11 = "border: 5px solid #3f51b5;";
  				break;
  			case 0.19:
  				this.sel19 = "border: 5px solid #3f51b5;";
  				this.sel11 = "";
  				break;  			
  			default:
  				// code...
  				break;
  		}  		
  	}
  	
  }

	  actualizarSaldo(saldo:any){
	  	this.newSaldo = {
	  		'nickname': this.dataJugador.nickname,
	  		'saldo':saldo
	  	};
	  	this.jugadorService.actualizarSaldo(this.newSaldo).subscribe(result=>{
	  		localStorage.setItem("dataJugador",JSON.stringify(this.dataJugador));
	  		
	  	},(err)=>{
	      Swal.fire({
	        title: 'ERROR!',
	        text: 'Error al actualizar el saldo, ERROR: ' + err.error.text,
	        icon: 'error'
	      });
	  	});
	  }

	nuevaPartida(){
		this.newPartida = {
			nickname:this.dataJugador.nickname,
			colorsel:this.colorsel,
			colorsistema:this.colorsistema,
			dineroapostado:this.dineroApostado,
			dineroresultante:this.dineroGanado,
			dineroperdido:this.dineroPerdido,
			porcentajeapostado:this.porcentajesel
		};
		this.partidaService.registrarPartida(this.newPartida).subscribe(result=>{
			this.actualizarSaldo(this.dataJugador.saldo);
		},(err)=>{
	  		Swal.fire({
		    	title: 'ERROR!',
		    	text: 'Error al procesar la partida, ERROR: ' + err.error.text,
		        icon: 'error'
		    });
		});
	}
	
	limpiar(){
		this.colorsel = "";
		this.dineroApostado =0;	
		this.selverde="";
		this.selrojo="";
		this.selnegro="";
		this.sel11="";
		this.sel19="";		
		this.porcentajesel = 0.00;					

	}

  apostar(){
  	this.dineroGanado = 0;
  	this.dineroPerdido = 0;
  	this.colorsistema = "";
  	this.resultado = Math.random() * 100;
  	this.activarGif = true;
	if(this.dataJugador.saldo > 0){
  		if(this.colorsel != "" && this.dineroApostado != 0){	
  		      setTimeout(() =>{
  		      	this.activarGif = false;
        		  	if(this.resultado <= 1){
		  		this.colorsistema = "Verde";
				if(this.colorsel == this.colorsistema){		
		  			this.dineroGanado = this.dineroApostado * 10;
		  			this.dataJugador.saldo = this.dataJugador.saldo + this.dineroGanado;
		  			
			  		Swal.fire({
					    title: 'Has ganado ' + this.dineroGanado + ', felicitaciones',
					    html: '<img src="https://media3.giphy.com/media/M9ZBBIaS3ReUuik3Ed/source.gif" alt="Smiley face" height="150" width="150">',
					});	
					this.nuevaPartida();					  		
					this.limpiar();
		  			
				}else{
		          Swal.fire({
		            title: 'Has perdido ' + this.dineroApostado,
		            icon: 'error'
		          });
		          this.dineroPerdido = this.dineroApostado;
		          this.dataJugador.saldo = Math.floor(this.dataJugador.saldo - this.dineroApostado); 
		          this.nuevaPartida();
					this.limpiar();
				}

		  	}else if(this.resultado > 1 && this.resultado <= 49.5){
		  		this.colorsistema = "Rojo";
		  		if(this.colorsel == this.colorsistema){
		  			this.dineroGanado = this.dineroApostado * 2;
		  			this.dataJugador.saldo = this.dataJugador.saldo + this.dineroGanado;
		
		  			Swal.fire({
			           title: 'Has ganado ' + this.dineroGanado + ', felicitaciones',
			           html: '<img src="https://media3.giphy.com/media/M9ZBBIaS3ReUuik3Ed/source.gif" alt="Smiley face" height="150" width="150">',
			        });			  			
		  			this.nuevaPartida();
		  			this.limpiar();					
		  		}else{

		          Swal.fire({
		            title: 'Has perdido ' + this.dineroApostado,
		            icon: 'error'
		          });
		          this.dineroPerdido = this.dineroApostado;
		          this.dataJugador.saldo = Math.floor(this.dataJugador.saldo - this.dineroApostado); 
		          this.nuevaPartida();
		          this.limpiar();					
		  		}
				
		  	}else{
		  		this.colorsistema = "Negro";
		  		if(this.colorsel == this.colorsistema){
					
		  			this.dineroGanado = this.dineroApostado * 2;
		  			this.dataJugador.saldo = this.dataJugador.saldo + this.dineroGanado;
		  			Swal.fire({
			           title: 'Has ganado ' + this.dineroGanado + ', felicitaciones',
					   html: '<img src="https://media3.giphy.com/media/M9ZBBIaS3ReUuik3Ed/source.gif" alt="Smiley face" height="150" width="150">',		           
			        });  			 
		  			this.nuevaPartida();
		  			this.limpiar();					
		  		}else{
		  		  this.dineroPerdido = this.dineroApostado;
		          Swal.fire({
		            title: 'Has perdido ' + this.dineroApostado,
		            icon: 'error'
		          });
		          this.dataJugador.saldo = Math.floor(this.dataJugador.saldo - this.dineroApostado); 
		          this.nuevaPartida();
		          this.limpiar();					  
		  		}
				
		  	}
      },2000);    		

	  	}else{
	  		Swal.fire({
		    	title: 'Lo siento!',
		    	text: 'Por favor, selecciona el color y el porcentaje a apostar.',
		        icon: 'error'
	    	});
	  	}
  	}else{
	  		Swal.fire({
		    	title: 'Lo siento!',
		    	text: 'No tienes saldo suficiente para apostar',
		        icon: 'error'
		    });  		
  	}


  }

}
