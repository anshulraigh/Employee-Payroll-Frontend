import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  private employeeService = inject(EmployeeService); // ✅ Injecting the service
  private router = inject(Router); // ✅ Injecting the Router

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (response) => {
        console.log('Fetched Employees:', response);
        this.employees = response.reverse();
      },
      error: (error) => console.error('Error fetching employees:', error),
    });
  }

  deleteEmployee(employeeId: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next: () => {
          console.log(`Deleted employee with ID: ${employeeId}`);
          // Fetch the updated employee list again
          this.getEmployees();
        },
        error: (error) => console.error('Error deleting employee:', error),
      });
    }
  }
  

  editEmployee(employee: any) {
    console.log('Edit Employee:', employee);
  }

  addEmployee() {
    this.router.navigate(['/add']); // ✅ Navigate to Employee Form
  }
}
