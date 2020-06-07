/* Imports */
  // Angular
  import { Routes } from '@angular/router';

  // Inner
  import { HomePageComponent } from "./routes/home-page/home-page.component";
  import { RegisterPageComponent } from "./routes/register-page/register-page.component";
  import { LoginPageComponent } from "./routes/login-page/login-page.component";
  import { AuthGuard } from "./auth.guard";

/* Export */
  export const AppRouterModule: Routes = [
    {
      path: '',
      component: HomePageComponent,
    },
    {
      path: 'register',
      component: RegisterPageComponent
    },
    {
      path: 'login',
      component: LoginPageComponent
    }
  ];