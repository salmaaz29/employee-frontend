// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';     // AJOUTE ÇA
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';               // ← AJOUTÉ
// import { RouterLinkActive } from '@angular/common';   // ← optionnel pour le style "active"

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink      ,
    CommonModule              // ← LA LIGNE MAGIQUE
    // RouterLinkActive           // ← si tu veux plus tard
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['test@com', [Validators.required, Validators.email]],
      password: ['salma123', Validators.required]
    });
  }

ngOnInit(): void {
  // Nettoyer TOUT le localStorage au chargement
  localStorage.clear();
  console.log('🧹 localStorage nettoyé');
}
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Email ou mot de passe incorrect';
          console.error('Login error:', error);
        }
      });
    }
  }
}