import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JugadorService {

	url = "https://casinobackend.herokuapp.com/";

  constructor(private http: HttpClient) { }

	registrarJugador(jugadorData:Array<any>){
		return this.http.post(`${this.url}app/jugador/registrarjugador.php`,jugadorData).
		pipe(map((res)=>{
			return  jugadorData
		}));
	}

  	getUser(nickname:any){
		return this.http.get(`${this.url}app/jugador/getJugadorbyNickname.php?nickname=${nickname}`);
	}	

	actualizarSaldo(jugadorUpdate:any){
  		return this.http.put(`${this.url}app/jugador/actualizarSaldo.php`,jugadorUpdate);
  	}	

	eliminarCuenta(nickname:any){
  		return this.http.put(`${this.url}app/jugador/removeJugador.php`,nickname);
  	}	  	

	actualizarJugador(jugadorUpdate:any){
  		return this.http.put(`${this.url}app/jugador/actualizarUsuario.php`,jugadorUpdate);
  	}	  	



}
