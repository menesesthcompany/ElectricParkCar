// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }


  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }


  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }


  logout(): void {
    localStorage.removeItem('user');
  }
}
