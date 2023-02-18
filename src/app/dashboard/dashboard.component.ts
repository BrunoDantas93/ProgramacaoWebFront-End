import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Teacher } from '../interface/teacher.model'
import * as signalR from '@microsoft/signalr';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private hubConnection: signalR.HubConnection;
  connectedUsers: string[] = [];
  currentUser: string;
  selectedUser: string;
  messages: any[] = [];
  messageText: string;
  constructor(private authService: AuthService,
    private router : Router,) { }

  ngOnInit() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7051/hub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => localStorage.getItem('token')?.toString() || ''
    }).configureLogging(signalR.LogLevel.Information).build();

    this.hubConnection.start().then(() => {
      console.log('Connection started!');
      this.getConnectedUsers();
    }).catch(err => console.error(err));

    this.hubConnection.on('UserConnected', (user: string) => {
      console.log(`${user} connected`);
      this.currentUser = user;
      this.getConnectedUsers();
    });

    this.hubConnection.on('UserDisconnected', (user: string) => {
      console.log(`${user} disconnected`);
      this.getConnectedUsers();
    });

    this.hubConnection.on('ReceiveMessage', (sender: string, text: string) => {
      console.log(`Received message from ${sender}: ${text}`);
      this.messages.push({ sender, text });
    });
  }

  getConnectedUsers() {
    this.hubConnection.invoke('GetConnectedUsers').then(users => {
      console.log('Connected users:', users);
      this.connectedUsers = users;
    });
  }

  selectUser(user: string) {
    console.log(`Selected user: ${user}`);
    this.selectedUser = user;
    this.messages = [];
  }

  sendMessage() {
    if (this.messageText && this.selectedUser) {
      console.log(`Sending message to ${this.selectedUser}: ${this.messageText}`);
      //send the message to the server
      this.hubConnection.invoke('SendMessageToUser', this.selectedUser, this.messageText).then(() => {
        console.log('Message sent');
        this.messageText = '';
      });
      
      /*this.hubConnection.invoke('ReceiveMessage', "ME", this.selectedUser, this.messageText).then(() => {
        console.log('Message sent');
        this.messageText = '';
      });*/
    }
  }

  logout() {
    this.router.navigate(['/login']);
    this.hubConnection.stop();
    this.authService.logout();
  }
}
/*
export class DashboardComponent implements OnInit {

  id: string | null; 

  private hubConnection: HubConnection | undefined;
  private headers: HttpHeaders;
  private token: string = '';
  isAuthorized = false;
  private hubConnectionBuilder!: HubConnection;
  public connectedUsers: string[] = [];

  constructor(private router: Router, private authService: AuthService) 
  {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
  }  
  
  ngOnInit() {  
    this.token = localStorage.getItem('token')?.toString() || '';
    this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('https://localhost:7051/hub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => this.token
    }).configureLogging(LogLevel.Information).build();
    this.hubConnectionBuilder.start().then(() => {
      console.log('Hub connection started');

      this.hubConnectionBuilder.on('UserConnected', (user: string) => {
        console.log('User connected: ' + user);
        this.connectedUsers.push(user);
      });

      
      this.hubConnectionBuilder.invoke('GetConnectedUsers').then((users: string[]) => {
        console.log('Connected users:', users);
        this.connectedUsers = users;
      });
    }).catch((error) => {
      console.log('Error starting hub connection:', error);
    });

    console.log('user', this.connectedUsers);

  }
    /*this.hubConnectionBuilder.start()
        .then(() => {
          console.log('Hub connection started');
          this.hubConnectionBuilder.invoke('getConnectedUsers')
            .then(users => {
              console.log(users);
            })
            .catch(error => {
              console.error(error);
            });
          }//console.log('Connection started.......!'))
        )
        .catch(err => console.log('Error while connect with server'));;
  }
  
  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/login']);  
  }  
}
*/