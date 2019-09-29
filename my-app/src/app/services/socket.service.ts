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

  public joinRoom(data) {
    this.socket.emit('join', data);
  }

  newUserJoin() {
    const observable = new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new uwser joined', (data) => {
        observer.next(data);
      });
      // If error, disconnect the socket.
      return () => { this.socket.disconnect(); };
    });
    return observable;
  }

  public send(message: string): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<any> {
    const observable = new Observable(observer => {
      this.socket.on('message', (data: string) => observer.next(data));
    });
    return observable;
  }
}
