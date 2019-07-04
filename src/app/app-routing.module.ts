import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'calendar', component: CalendarViewComponent },
  { path: '', component: CalendarViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
