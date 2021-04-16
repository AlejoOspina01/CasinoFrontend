import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PartidaService {

	url="https://casinobackend.herokuapp.com/"

  constructor(private http: HttpClient) { }

	registrarPartida(partidaData:any){
		return this.http.post(`${this.url}app/partida/registrarpartida.php`,partidaData).
		pipe(map((res)=>{
			return  partidaData
		}));
	}

	getsPartidasByNickname(nickname:any){
		return this.http.get(`${this.url}/app/partida/getsPartidasByNickname.php?nickname=${nickname}`);
	}

}
