import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'api/employees';
  private employeesCache: any[] | null = null; // Cache for all employees
  private employeeCache: { [key: number]: any } = {}; // Cache for individual employee by ID

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    if (this.employeesCache) {
      return of(this.employeesCache); // Return cached data
    } else {
      return this.http.get<any[]>(this.apiUrl).pipe(
        tap((data) => {
          this.employeesCache = data; // Cache all employees
        })
      );
    }
  }

  getEmployeeById(id: number): Observable<any> {
    // Check if the employee is already cached
    if (this.employeeCache[id]) {
      return of(this.employeeCache[id]); // Return cached employee data
    } else {
      // Make API call if not cached
      return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
        tap((data) => {
          this.employeeCache[id] = data; // Cache the individual employee
        })
      );
    }
  }

  clearCache(): void {
    this.employeesCache = null; // Clear the cache for all employees
    this.employeeCache = {}; // Clear individual employee cache
  }
}
