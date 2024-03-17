import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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
  redirect: string = "/";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.redirect = this.route.snapshot.queryParamMap.get("redirectTo") ?? "/";
    this.checkRoute();
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
      this.router.navigate([this.redirect]);
    }
  }
}
