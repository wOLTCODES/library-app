import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/dashboard/login/login.component';
import { BookEditComponent } from './components/main/catalog/book-edit/book-edit.component';
import { CatalogComponent } from './components/main/catalog/catalog.component';
import { PendingsComponent } from './components/main/pendings/pendings.component';
import { UserBooksComponent } from './components/main/user-books/user-books.component';
import { HistoryComponent } from './components/main/history/history.component';
import { ProfileComponent } from './components/main/profile/profile.component';
import { UsersComponent } from './components/main/users/users.component';
import { RegisterComponent } from './components/dashboard/register/register.component';
import { UploaderBookComponent } from './components/main/searchbar-catalog/uploader-book/uploader-book.component';
import { UploaderUserComponent } from './components/main/searchbar-users/uploader-user/uploader-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'catalog', pathMatch: 'full' },
  { path: 'catalog', component: CatalogComponent },
  { path: 'users', component: UsersComponent },
  { path: 'pendings', component: PendingsComponent },
  { path: 'books', component: UserBooksComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'uploader-book', component: UploaderBookComponent },
  { path: 'edit-book', component: BookEditComponent },
  { path: 'uploader-user', component: UploaderUserComponent },
  { path: '**', component: CatalogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
