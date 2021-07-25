import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthServiceService } from './shared/services/auth-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserGetService } from './shared/services/user-get.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderModifierInterceptor } from './shared/interceptors/header-modifier.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthServiceService,
    UserGetService,
    {provide: HTTP_INTERCEPTORS, useClass: HeaderModifierInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
