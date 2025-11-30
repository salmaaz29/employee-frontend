import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../services/employee.service';

import { CommonModule } from '@angular/common';     // AJOUTE ÇA



@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.html',
  styleUrls: ['./employee-details.css'],
  imports: [
    CommonModule
  ]
})
export class EmployeeDetailsComponent implements OnInit {
authoritiesDisplay() {
throw new Error('Method not implemented.');
}
  employee: Employee | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadEmployee(Number(id));
    } else {
      this.errorMessage = 'ID employé non valide';
      this.isLoading = false;
    }
  }

  loadEmployee(id: number): void {
    this.isLoading = true;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employee = employee;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des détails de l\'employé';
        this.isLoading = false;
        console.error('Error loading employee details:', error);
        
        // Debug: afficher l'erreur complète
        console.log('Error details:', error);
      }
    });
  }

  onEdit(): void {
    if (this.employee) {
      this.router.navigate(['/employees/edit', this.employee.id]);
    }
  }

  onDelete(): void {
    if (this.employee && confirm(`Êtes-vous sûr de vouloir supprimer l'employé ${this.employee.firstName} ${this.employee.lastName} ?`)) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la suppression de l\'employé';
          console.error('Error deleting employee:', error);
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/employees']);
  }

  // Méthode utilitaire pour debugger
  getEmployeeProperties(): string {
    if (!this.employee) return 'Aucun employé chargé';
    return Object.keys(this.employee).join(', ');
  }
}