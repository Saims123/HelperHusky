import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { User } from './user';
import { OAuthSettings } from './oauth';
import { Client } from '@microsoft/microsoft-graph-client';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

/**
 *  Authentication Services allows users to login and logout of the application.
 *
 *  Uses MSAL for authentication for the Mircrosoft Graph API.
 *
 *  Uses Implicit Grant method to retrieve session tokens.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth: boolean;
  public isTokenReady: boolean;
  public user: User;

  constructor(private msalService: MsalService, private router: Router, private toastService: ToastrService) {
    this.isAuth = false;
    this.isTokenReady = true;
    this.user = null;
    this.isAuth = this.msalService.getUser() != null;
    this.getUser().then(user => {
      this.user = user;
    });
  }

  async signIn(): Promise<void> {
    this.isTokenReady = false;
    let result = await this.msalService.loginPopup(OAuthSettings.scopes).catch(reason => {
      console.warn('Login failed', JSON.stringify(reason, null, 2));
      this.toastService.error(JSON.stringify(reason, null, 2), 'Login Retrival error', {
        timeOut: 20000,
        progressBar: true
      });
    });
    if (result) {
      this.isAuth = true;
      this.user = await this.getUser();
      this.router.navigate(['/calendar']);

    }
  }

  signOut(): void {
    this.msalService.logout();
    sessionStorage.clear();
    this.user = null;
    this.isAuth = false;
    this.router.navigate(['/login']);
    this.isTokenReady = null;
  }

  /**
   * Support function that aquires the JWT token during the login phrase.
   * @returns JWT token string
   */
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(OAuthSettings.scopes).catch(reason => {
      console.error('Get token silently failed', JSON.stringify(reason, null, 2));
      this.isTokenReady = false;
    });

    if (result) {
      this.isTokenReady = true;
    }
    return result;
  }
  /**
   * Support function that aquires the user profile after login phrase
   * @returns User
   */
  private async getUser(): Promise<User> {
    if (!this.isAuth) {
      return null;
    }

    let graphClient = Client.init({
      authProvider: async done => {
        let token = await this.getAccessToken().catch(reason => {
          done(reason, null);
        });

        if (token) {
          done(null, token);
        } else {
          done('Could not get access token', null);
        }
      }
    });

    const graphUser = await graphClient.api('/me').get();
    let user = new User();
    user.displayName = graphUser.displayName;
    user.mail = graphUser.mail || graphUser.userPrincipalName;
    user.id = graphUser.id;
    user.jobTitle = graphUser.jobTitle;
    user.location = graphUser.location;
    return user;
  }
}
