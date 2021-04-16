import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.component.html',
  styleUrls: ['./menuprincipal.component.css']
})
export class MenuprincipalComponent implements OnInit {

	dataJugador = JSON.parse(localStorage.getItem('dataJugador'));

  constructor() { }

  ngOnInit(): void {
  }

}
