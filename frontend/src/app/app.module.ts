import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CatalogComponent } from './components/main-page/catalog/catalog.component';
import { UsersComponent } from './components/main-page/users/users.component';
import { SidebarItemComponent } from './components/sidebar/sidebar-item/sidebar-item.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PendingsComponent } from './components/main-page/pendings/pendings.component';
import { UserBooksComponent } from './components/main-page/user-books/user-books.component';
import { UserHistoryComponent } from './components/main-page/user-history/user-history.component';
import { UserProfileComponent } from './components/main-page/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { CatalogItemComponent } from './components/main-page/catalog/catalog-item/catalog-item.component';
import {GlobalHttpInterceptorServiceInterceptor} from "./interceptors/global-http-interceptor-service.interceptor";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PendingsItemComponent } from './components/main-page/pendings/pendings-item/pendings-item/pendings-item.component';
import { UserBooksItemComponent } from './components/main-page/user-books/user-books-item/user-books-item/user-books-item.component';
import { UserHistoryItemComponent } from './components/main-page/user-history/user-history-item/user-history-item/user-history-item.component';
import { UsersItemComponent } from './components/main-page/users/users-item/users-item/users-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CatalogComponent,
    UsersComponent,
    SidebarItemComponent,
    SearchBarComponent,
    PendingsComponent,
    UserBooksComponent,
    UserHistoryComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent,
    CatalogItemComponent,
    PendingsItemComponent,
    UserBooksItemComponent,
    UserHistoryItemComponent,
    UsersItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FontAwesomeModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorServiceInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
