import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class EmployeeFormComponent {
  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  departments = ['HR', 'Sales', 'Finance', 'Engineer', 'Other'];
  salaryOptions = ['₹30,000', '₹40,000', '₹50,000', '₹60,000', '₹70,000'];
  dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
  monthOptions = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  yearOptions = Array.from({ length: 10 }, (_, i) => 2025 - i);

  employeeData: any = {
    name: '',
    profileImage: '',
    gender: '',
    departments: [],
    salary: '',
    startDate: {
      day: '',
      month: '',
      year: ''
    },
    notes: ''
  };

  submitForm() {
    // Remove the currency symbol and commas, and convert to a number
    const salary = parseFloat(this.employeeData.salary.replace(/[^0-9.-]+/g, ''));

    if (!isNaN(salary)) {
      this.employeeData.salary = salary; // Update the salary field with the numeric value
      this.employeeService.addEmployee(this.employeeData).subscribe({
        next: (response) => {
          console.log('Employee added:', response);
          this.router.navigate(['/']);
        },
        error: (error) => console.error('Error adding employee:', error)
      });
    } else {
      console.error("Invalid salary format");
    }
  }

  resetForm() {
    this.employeeData = {
      name: '',
      profileImage: '',
      gender: '',
      departments: [],
      salary: '',
      startDate: {
        day: '',
        month: '',
        year: ''
      },
      notes: ''
    };
  }

  cancelForm() {
    this.router.navigate(['/']);
  }

  // Fix: Explicitly define the type for 'd' in the filter function
  updateDepartments(event: Event, dept: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.employeeData.departments = [...this.employeeData.departments, dept];
    } else {
      this.employeeData.departments = this.employeeData.departments.filter((d: string) => d !== dept);
    }
  }
}
