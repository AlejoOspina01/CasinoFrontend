import { Component, OnInit } from '@angular/core';

//Services
import {PartidaService} from '../../services/partida.service';

@Component({
  selector: 'app-mispartidas',
  templateUrl: './mispartidas.component.html',
  styleUrls: ['./mispartidas.component.css']
})
export class MispartidasComponent implements OnInit {

	dataJugador = JSON.parse(localStorage.getItem('dataJugador'));	
  mispartidas:any;

  constructor(private partidaService:PartidaService) { this.getsMisPartidas();}

  ngOnInit(): void {
  }

  getsMisPartidas(){
  	this.partidaService.getsPartidasByNickname(this.dataJugador.nickname).subscribe(result=>{
      this.mispartidas = result;
      if(this.mispartidas.length == 0) 
        this.mispartidas = null;
    },(err)=>{

    });
  }

}
