import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
})
export class DirectoryComponent implements OnInit {
  downloadCSV = () => {
    const csvHeader = 'Name,Job Title,Department\n'; // Define the CSV headers
    const csvContent = this.employees
      .map((e) => `${e.name},${e.jobTitle},${e.department}`)
      .join('\n');
    const csvData = csvHeader + csvContent;
    const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'employees.csv');
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };
  employees: any[] = [];
  searchQuery: string = '';
  employeesPerPage: number = 8; // Number of employees per page
  currentPage: number = 1; // Current page number

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    public authService: AuthService
  ) {}

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages()) {
      this.currentPage = page; // Update the current page
    }
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  totalPages(): number {
    const filtered = this.employees.filter((employee) =>
      employee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    return Math.ceil(filtered.length / this.employeesPerPage);
  }

  get filteredEmployees() {
    const filtered = this.employees.filter((employee) =>
      employee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    const start = (this.currentPage - 1) * this.employeesPerPage;
    const end = start + this.employeesPerPage;
    return filtered.slice(start, end);
  }

  viewProfile(id: number) {
    this.router.navigate(['/profile', id]);
  }

  deleteEmployee(id: number) {
    if (this.authService.isAdmin()) {
      this.employees = this.employees.filter((employee) => employee.id !== id);
    }
  }

  ngOnInit(): void {
    this.employeeService
      .getEmployees()
      .subscribe((data) => (this.employees = data));
  }
}
