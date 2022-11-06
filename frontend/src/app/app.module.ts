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

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CatalogComponent,
    UsersComponent,
    SidebarItemComponent,
    SearchBarComponent,
    PendingsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
