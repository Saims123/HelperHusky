import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialModule } from './material-design.module';
import { LoginComponent } from './login/login.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from './services/auth/oauth';

registerLocaleData(en);
@NgModule({
  declarations: [AppComponent, NavigationComponent, LoginComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    RouterModule,
    MsalModule.forRoot({
      clientID: OAuthSettings.appId,
      authority: 'https://login.microsoftonline.com/stevesimhotmail.onmicrosoft.com/',
      postLogoutRedirectUri: window.location.origin
    }),
    MaterialModule,
    NgZorroAntdModule,
    HttpClientModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
