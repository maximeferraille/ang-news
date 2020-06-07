import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Router
import { RouterModule } from "@angular/router"
import { AppRouterModule } from "./app.router";

// Crud
import { CrudService } from "./services/crud/crud.service";
import { ObservableService } from "./services/observable/observable.service";
import { TokenInterceptor } from "./auth/token.interceptor";

// Component
import { AppComponent } from './app.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { RegisterPageComponent } from './routes/register-page/register-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FormLoginComponent } from './shared/form-login/form-login.component';
import { FormRegisterComponent } from './shared/form-register/form-register.component';
import { ItemPostComponent } from './shared/item-post/item-post.component';
import { FormSearchComponent } from './shared/form-search/form-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HeaderComponent,
    FormLoginComponent,
    FormRegisterComponent,
    ItemPostComponent,
    FormSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot( AppRouterModule, { onSameUrlNavigation: 'reload' } )
  ],
  providers: [
    CrudService,
    ObservableService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi : true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
