import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Importação do HttpClientModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],  // Adicionando HttpClientModule aqui
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginObj: any = {
    login: "",
    senha: ""
  };

  showMessage = false;
  message = "";
  isSuccess = false;
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  
  http = inject(HttpClient);
  authService = inject(AuthService);

  constructor(private router: Router) {}

  onLogin() {
    if (!this.loginObj.login || !this.loginObj.senha) {
      return;
    }

    this.http.post("http://localhost:7053/api/User/login", this.loginObj).subscribe(
      (res: any) => {
        if (res.sucesso) {
          this.authService.setUser({ login: this.loginObj.login });
          this.router.navigateByUrl("/dashboard");
          this.showMessage = true;
          this.message = "Login realizado com sucesso!";
          this.isSuccess = true;
        } else {
          this.showMessage = true;
          this.message = res.mensagem || "Verifique seu login ou senha.";
          this.isSuccess = false;
        }
      },
      (error) => {
        this.showMessage = true;
        this.message = "Ocorreu um erro ao tentar fazer login.";
        this.isSuccess = false;
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
