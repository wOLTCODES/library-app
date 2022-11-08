import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CatalogComponent } from './components/main-page/catalog/catalog.component';
import { PendingsComponent } from './components/main-page/pendings/pendings.component';
import { UserBooksComponent } from './components/main-page/user-books/user-books.component';
import { UserHistoryComponent } from './components/main-page/user-history/user-history.component';
import { UserProfileComponent } from './components/main-page/user-profile/user-profile.component';
import { UsersComponent } from './components/main-page/users/users.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'users', component: UsersComponent },
  { path: 'pendings', component: PendingsComponent },
  { path: 'books', component: UserBooksComponent },
  { path: 'history', component: UserHistoryComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
