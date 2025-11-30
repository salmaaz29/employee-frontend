import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';     // AJOUTE ÇA


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.css'],
    imports: [ReactiveFormsModule,
      CommonModule
    ]

})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode: boolean = false;
  employeeId: number | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.createForm();
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.employeeId;

    if (this.isEditMode && this.employeeId) {
      this.loadEmployee(this.employeeId);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', [Validators.required, Validators.min(0)]],
      password: ['']
    });
  }

  loadEmployee(id: number): void {
    this.isLoading = true;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          salary: employee.salary
          // Ne pas pré-remplir le password pour des raisons de sécurité
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement de l\'employé';
        this.isLoading = false;
        console.error('Error loading employee:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const formData = {
        ...this.employeeForm.value,
        salary: parseFloat(this.employeeForm.value.salary)
      };

      // Si c'est une édition, on envoie l'ID
      if (this.isEditMode && this.employeeId) {
        const employeeData: Employee = {
          id: this.employeeId,
          ...formData
        };
        
        this.employeeService.updateEmployee(this.employeeId, employeeData).subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/employees']);
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = 'Erreur lors de la modification de l\'employé';
            console.error('Error updating employee:', error);
          }
        });
      } else {
        // Si c'est une création, on s'assure d'avoir un mot de passe
        if (!formData.password) {
          this.errorMessage = 'Le mot de passe est requis pour un nouvel employé';
          this.isLoading = false;
          return;
        }

        this.employeeService.createEmployee(formData).subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/employees']);
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = 'Erreur lors de la création de l\'employé';
            console.error('Error creating employee:', error);
          }
        });
      }
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.employeeForm.controls).forEach(key => {
        this.employeeForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get firstName() { return this.employeeForm.get('firstName'); }
  get lastName() { return this.employeeForm.get('lastName'); }
  get email() { return this.employeeForm.get('email'); }
  get salary() { return this.employeeForm.get('salary'); }
  get password() { return this.employeeForm.get('password'); }
}