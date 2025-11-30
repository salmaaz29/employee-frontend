// employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../services/employee.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';     // AJOUTE ÇA



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css'],
    imports: [CurrencyPipe,
      CommonModule
    ]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  isLoading = true;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    console.log('Chargement des employés...'); // Pour voir dans la console

    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        console.log('Données reçues :', data); // TU DOIS VOIR ÇA DANS LA CONSOLE
        this.employees = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('ERREUR HTTP :', err);
        console.error('Status :', err.status);
        this.isLoading = false;
        alert('Erreur de chargement des employés. Vérifie la console.');
      }
    });
  }

  addEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/employees', id]);
  }

  editEmployee(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }

  deleteEmployee(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: (error) => console.error('Error deleting employee:', error)
      });
    }
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // ... tes autres méthodes (edit, delete, etc.)
}