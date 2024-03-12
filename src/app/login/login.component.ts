import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import AuthService from "../_services/auth.service";

@Component({
  standalone: true,
  selector: "app-login",
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
  providers: [HttpClient]
})
export class LoginComponent {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  roles: string[] = [];

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: (_data) => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
}
