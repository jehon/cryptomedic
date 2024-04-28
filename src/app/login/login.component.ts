import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import AuthService from "../_services/auth.service";

@Component({
  standalone: true,
  selector: "app-login",
  imports: [FormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css"
})
export class LoginComponent implements OnInit {
  form = {
    username: "",
    password: ""
  };
  isLoginFailed = false;
  errorMessage = "";
  redirectTo$: string = "/";

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkRoute();
  }

  @Input()
  set redirectTo(redirectTo: string) {
    this.redirectTo$ = redirectTo;
  }

  get redirectTo(): string {
    return this.redirectTo$;
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: () => {
        this.isLoginFailed = false;
        this.toastr.success("Logged in");
        this.checkRoute();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  checkRoute() {
    if (this.authService.isAuthenticated()) {
      // Use this to avoid url encoded redirect
      this.router.navigateByUrl(this.redirectTo);
    }
  }
}
