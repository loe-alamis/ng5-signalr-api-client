import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
declare var $: any;

@Injectable()
export class HubserviceService {
  private connection: any;
  private proxy: any;
  private url: any;

  constructor() { }

  public startConnection(): void {
    this.connection = $.hubConnection('http://localhost:52659/signalr', { useDefaultPath: false });
    this.proxy = this.connection.createHubProxy('myHub');

    this.connection.start().done((data: any) => {
      console.log('Connected to Processing Hub');
    }).catch((error: any) => {
      console.log('Hub error -> ' + error);
    });
  }

}
