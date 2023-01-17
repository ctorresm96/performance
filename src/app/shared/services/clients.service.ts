/* eslint-disable prefer-template */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */

import { Injectable } from '@angular/core';
import { Client } from '../interfaces/user.interface';

import * as moment from 'moment';
// import { sub } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  public generateClients(qty: number): Client[] {
    const result: Client[] = [];

    for (let i = 0; i < qty; i++) {
      result.push(this.generateClient());
    }

    return result;
  }

  generateClient(clientName?: string): Client {
    return {
      name: clientName || this.generateName(),
      score: this.getRandomInt(0, 5),
      registerDate: this.generateDate(),
    };
  }

  private generateDate(): string | Date {
    const days = this.getRandomInt(0, 1000);
    
    return moment().subtract(days, 'days').toISOString();
    // return sub(new Date(), { days });
  }

  private generateName(): string {
    const indexName = this.getRandomInt(0, NAMES.length - 1);
    const indexLastName = this.getRandomInt(0, LAST_NAMES.length - 1);

    return NAMES[indexName] + ' ' + LAST_NAMES[indexLastName];
  }

  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

const NAMES = [
  'Maia',
  'Frazier',
  'Rachael',
  'Bean',
  'Lloyd',
  'Stephens',
  'Arjan',
  'Shaw',
  'Nikhil',
  'Greene',
  'Fred',
  'Snyder',
  'Ralph',
  'Burch',
  'Derek',
  'Haines',
  'Alison',
  'Roach',
  'Cruz',
  'Gonzalez',
  'Allen',
  'Kiara',
  'Mack',
  'Harriett',
  'Mooney',
  'Cohen',
  'Strong',
  'Niall',
  'Bishop',
  'Zuzanna',
  'Ingram',
  'Jannat',
  'Odom',
  'Leo',
  'Wyatt',
  'Emmanuel',
  'Aguilar',
  'Hasan',
  'Moon',
  'Cassius',
  'Poole',
  'Dora',
  'Robinson',
  'Cian',
  'Brown',
  'Dawud',
  'Riggs',
  'Thomas',
  'Nolan',
  'Sienna',
  'Maddox',
];

const LAST_NAMES = [
  'Marcel',
  'Gould',
  'Kye',
  'Warner',
  'Angelo',
  'Holden',
  'Kendra',
  'Hogan',
  'Philip',
  'Park',
  'Brooke',
  'Holmes',
  'Courtney',
  'Mcmillan',
  'Amirah',
  'Chaney',
  'Raja',
  'Proctor',
  'Kayla',
  'Bruce',
  'Xander',
  'Cole',
  'Camilla',
  'Sutherland',
  'Virgil',
  'Turner',
  'Hana',
  'Valencia',
  'Matilda',
  'Lam',
  'Stevie',
  'Bridges',
  'Tessa',
  'Meadows',
  'Ajay',
  'Bryant',
  'Kieron',
  'Gray',
  'Diana',
  'Hebert',
  'Kimberly',
  'Soto',
  'Aisha',
  'Meyers',
  'Chester',
  'Acosta',
  'Anisa',
  'Sullivan',
];
