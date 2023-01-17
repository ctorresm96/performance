import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  arrList: any[];

  constructor() {
    this.populateData();
  }

  populateData() {
    this.arrList = [
      {
        text: 'Inicio',
        textBack: 'Volver a Inicio',
        href: '/inicio',
      },
      {
        text: 'Transferir Dinero',
        textBack: 'Volver a Transferir Dinero',
        href: '/transferir',
      },
      {
        text: 'A otras personas',
        textBack: 'Volver a Otras personas',
        href: '/saldo',
      },
    ];
  }

  handleClick(event: Event) {
    console.log('(itemClick) event listened', event);
  }
}
