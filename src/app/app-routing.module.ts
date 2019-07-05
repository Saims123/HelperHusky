import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { MsalGuard } from '@azure/msal-angular';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'calendar', component: CalendarViewComponent, canActivate: [MsalGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
