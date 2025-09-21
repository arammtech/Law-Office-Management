import { Injectable } from '@angular/core';
import { loggedUser } from './models/cls-user';

@Injectable({
  providedIn: 'root',
})
export class SessionManagement {
  private sessionKey = 'user_session';
  
  // Set the session data in localStorage
  setSession(sessionData: loggedUser): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
  }
  // Retrieve session data from localStorage
  getSession(): loggedUser | null {
    const session = localStorage.getItem(this.sessionKey);
    return session ? JSON.parse(session) : null;
  }
  // End the session by removing the session data
  endSession(): void {
    localStorage.removeItem(this.sessionKey);
  }
  // Check if the user is authenticated
  isAuthenticated(): boolean {  
    return !!this.getSession();
  }
}