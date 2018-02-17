import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { MenudetailsComponent } from '../menudetails/menudetails.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { TestComponent } from '../test/test.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'menu',     component: MenuComponent },
  { path: 'menudetails/:id',     component: MenudetailsComponent },
  { path: 'contact',     component: ContactComponent },
  { path: 'about',     component: AboutComponent },
  { path: 'test',     component: TestComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' }
];