# Frontend - Gestion des Employés (Angular): 
## Objectif
Application web moderne pour la gestion des employés avec authentification JWT, développée avec Angular 17+ et Tailwind CSS
## Fonctionnalités
✅ Authentification JWT avec login/logout
✅ CRUD complet sur les employés
✅ Protection des routes avec AuthGuard
✅ Formulaires réactifs avec validation
✅ Interface responsive avec Tailwind CSS
✅ Génération de rapports PDF
✅ Gestion des erreurs utilisateur
✅ Navigation intuitive

## Installation
  ```
Cloner le repository
git clone https://github.com/salmaaz29/employee-frontend.git
cd employee-frontend
  ```
## Installation & lancement

1. **Cloner le projet**
   ```
   git clone https://github.com/salmaaz29/backend_empolyee.git
   cd backend_empolyee
    ```
2. **Lancer**
 ```
ng serve
 L'application sera accessible sur http://localhost:4200
  ```  
## Structure du projet
 ```
src/
├── app/
│   ├── employee-details/
│   │   ├── employee-details.component.ts
│   │   ├── employee-details.html
│   │   └── employee-details.css
│   ├── employee-form/
│   │   ├── employee-form.component.ts
│   │   ├── employee-form.html
│   │   └── employee-form.css
│   ├── employee-list/
│   │   ├── employee-list.component.ts
│   │   ├── employee-list.html
│   │   └── employee-list.css
│   ├── login/
│   │   ├── login.component.ts
│   │   ├── login.html
│   │   └── login.css
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptors/
│   │   └── jwt.interceptor.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── employee.service.ts
│   ├── models/
│   │   └── employee.model.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.ts
│   └── app.html
├── index.html
├── main.ts
└── styles.css
 ```
## Prérequis
- Java 17 ou supérieur
- Maven 3.8+
- MySQL 8.0

**Routes**
  AuthGuard
Toutes les routes marquées "Oui" sont protégées par
**installer les dépendances**
  ```
mvn clean install   L'application sera accessible sur http://localhost:8080
  ```
**Services**
  ```
AuthService: Gère l'authentification
EmployeeService: Gère les opérations CRUD
  ```
** Composants**
  ```
- LoginComponent: 
Formulaire de connexion avec validation
Gestion des erreurs de connexion
Redirection après succès
- EmployeeListComponent:
Affichage de la liste des employés
Actions : Detail, Modifier, Supprimer
Bouton d'ajout
- EmployeeFormComponent:
Mode ajout ou modification
Formulaire réactif avec validation
Messages d'erreur inline
- EmployeeDetailsComponent
Affichage des détails d'un employé
Boutons : Retour, Modifier
  ```
** Sécurité**
  ```
- Stockage du Token
- Le token JWT est stocké dans le localStorage 
- Intercepteur HTTP: Injection automatique du token dans les requêtes
  ```
