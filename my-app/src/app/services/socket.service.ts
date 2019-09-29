import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

const BACKEND_URL = 'http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() { }

  public initSocket(): void {
    this.socket = io(BACKEND_URL);
  }

  // Sending messages
  public send(data): void {
    this.socket.emit('message', data);
  }

  public onMessage(): Observable<any> {
    const observable = new Observable(observer => {
      this.socket.on('message', (data) => observer.next(data));
    });
    return observable;
  }
}
