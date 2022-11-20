import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/main/sidebar/sidebar.component';
import { CatalogComponent } from './components/main/catalog/catalog.component';
import { UsersComponent } from './components/main/users/users.component';
import { SidebarItemComponent } from './components/main/sidebar/sidebar-item/sidebar-item.component';
import { SearchCatalogComponent } from './components/main/searchbar-catalog/search-catalog.component';
import { PendingsComponent } from './components/main/pendings/pendings.component';
import { UserBooksComponent } from './components/main/user-books/user-books.component';
import { HistoryComponent } from './components/main/history/history.component';
import { ProfileComponent } from './components/main/profile/profile.component';
import { LoginComponent } from './components/dashboard/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/dashboard/register/register.component';
import { CatalogItemComponent } from './components/main/catalog/catalog-item/catalog-item.component';
import { GlobalHttpInterceptorServiceInterceptor } from './interceptors/global-http-interceptor-service.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PendingsItemComponent } from './components/main/pendings/pendings-item/pendings-item/pendings-item.component';
import { UserBooksItemComponent } from './components/main/user-books/user-books-item/user-books-item/user-books-item.component';
import { UsersItemComponent } from './components/main/users/users-item/users-item/users-item.component';
import { UploaderBookComponent } from './components/main/searchbar-catalog/uploader-book/uploader-book.component';
import { SearchUserComponent } from './components/main/searchbar-users/search-user.component';
import { BookEditComponent } from './components/main/catalog/book-edit/book-edit.component';
import { UploaderUserComponent } from './components/main/searchbar-users/uploader-user/uploader-user.component';
import { HistoryItemComponent } from './components/main/history/history-item/user-history-item/history-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CatalogComponent,
    UsersComponent,
    SidebarItemComponent,
    SearchCatalogComponent,
    PendingsComponent,
    UserBooksComponent,
    HistoryComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    CatalogItemComponent,
    PendingsItemComponent,
    UserBooksItemComponent,
    HistoryItemComponent,
    UsersItemComponent,
    UploaderBookComponent,
    SearchUserComponent,
    BookEditComponent,
    UploaderUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorServiceInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
