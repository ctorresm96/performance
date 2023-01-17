/* eslint-disable lines-between-class-members */
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/interfaces/user.interface';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  localClients: Client[] = [];
  globalClients: Client[] = [];

  constructor(public clientService: ClientsService) {}

  ngOnInit(): void {
    this.localClients = this.clientService.generateClients(1000);
    this.globalClients = this.clientService.generateClients(1000);
  }

  add(list: Client[], newName): void {
    const newClient = this.clientService.generateClient(newName);
    list.unshift(newClient);
  }
}
