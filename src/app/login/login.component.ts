import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import AuthService from "../_services/auth.service";
import BackendAuthInterface from "../_services/backend.auth";

@Component({
  standalone: true,
  selector: "app-login",
  imports: [FormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css"
})
export class LoginComponent {
  form = {
    username: "",
    password: ""
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  data?: BackendAuthInterface;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: (data: BackendAuthInterface) => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.data = data;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
}
