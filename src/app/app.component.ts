import { Component, ChangeDetectorRef  } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private connection: any;
  private proxy: any;
  private ulr: any;
  public messages: string[] = [];
  public message= '';
  public name= '';

  constructor(private ref: ChangeDetectorRef){}

  ngOnInit() {
    this.connection = $.hubConnection('http://localhost:52659/signalr', { useDefaultPath: false});
    this.connection.logging = true;
    
    this.proxy = this.connection.createHubProxy('myHub');

    //this.name = prompt('Enter your name', '');
    this.name = 'client';

    this.proxy.on('addNewMessageToPage', (name: string, message: string) => {
      var self = this;
      self.message = message;
      const text = `${name}: ${message}`;
      self.messages.push(text);
      self.ref.detectChanges();

      console.log(self.message);
      console.log(self.messages);
    });

    this.connection.start().done((data: any) => {
      console.log('Connected to Processing Hub');
    }).catch((error: any) => {
      console.log('Hub error -> ' + error);
    });
  }

  onSend(): void {
    this.proxy.invoke('send', this.name, this.message);
  }

}
