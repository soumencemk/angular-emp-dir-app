import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockDataService implements InMemoryDbService {
  constructor() {}
  createDb() {
    const employees = [
      {
        id: 1,
        name: 'John Doe',
        jobTitle: 'Software Engineer',
        department: 'Engineering',
        contact: 'john.doe@company.com',
        location: 'New York',
      },
      {
        id: 2,
        name: 'Jane Smith',
        jobTitle: 'Project Manager',
        department: 'Management',
        contact: 'jane.smith@company.com',
        location: 'London',
      },
      {
        id: 3,
        name: 'Mike Johnson',
        jobTitle: 'Designer',
        department: 'Design',
        contact: 'mike.johnson@company.com',
        location: 'Berlin',
      },
      {
        id: 4,
        name: 'Emily Davis',
        jobTitle: 'Marketing Specialist',
        department: 'Marketing',
        contact: 'emily.davis@company.com',
        location: 'San Francisco',
      },
      {
        id: 5,
        name: 'James Brown',
        jobTitle: 'Business Analyst',
        department: 'Management',
        contact: 'james.brown@company.com',
        location: 'Chicago',
      },
      {
        id: 6,
        name: 'Robert Wilson',
        jobTitle: 'DevOps Engineer',
        department: 'Engineering',
        contact: 'robert.wilson@company.com',
        location: 'New York',
      },
      {
        id: 7,
        name: 'Olivia Taylor',
        jobTitle: 'HR Manager',
        department: 'Human Resources',
        contact: 'olivia.taylor@company.com',
        location: 'London',
      },
      {
        id: 8,
        name: 'David Anderson',
        jobTitle: 'Product Manager',
        department: 'Product',
        contact: 'david.anderson@company.com',
        location: 'Berlin',
      },
      {
        id: 9,
        name: 'Sophia Martinez',
        jobTitle: 'QA Engineer',
        department: 'Engineering',
        contact: 'sophia.martinez@company.com',
        location: 'San Francisco',
      },
      {
        id: 10,
        name: 'Daniel Thomas',
        jobTitle: 'Frontend Developer',
        department: 'Engineering',
        contact: 'daniel.thomas@company.com',
        location: 'New York',
      },
      {
        id: 11,
        name: 'Laura Garcia',
        jobTitle: 'Social Media Manager',
        department: 'Marketing',
        contact: 'laura.garcia@company.com',
        location: 'London',
      },
      {
        id: 12,
        name: 'Christopher Moore',
        jobTitle: 'Data Scientist',
        department: 'Data Science',
        contact: 'christopher.moore@company.com',
        location: 'Chicago',
      },
      {
        id: 13,
        name: 'Elizabeth Harris',
        jobTitle: 'Backend Developer',
        department: 'Engineering',
        contact: 'elizabeth.harris@company.com',
        location: 'Berlin',
      },
      {
        id: 14,
        name: 'Matthew Clark',
        jobTitle: 'UX Designer',
        department: 'Design',
        contact: 'matthew.clark@company.com',
        location: 'San Francisco',
      },
      {
        id: 15,
        name: 'Mia Lewis',
        jobTitle: 'Content Strategist',
        department: 'Marketing',
        contact: 'mia.lewis@company.com',
        location: 'London',
      },
      {
        id: 16,
        name: 'Benjamin Walker',
        jobTitle: 'Technical Writer',
        department: 'Product',
        contact: 'benjamin.walker@company.com',
        location: 'Chicago',
      },
      {
        id: 17,
        name: 'Charlotte Young',
        jobTitle: 'Scrum Master',
        department: 'Management',
        contact: 'charlotte.young@company.com',
        location: 'Berlin',
      },
      {
        id: 18,
        name: 'Lucas Hall',
        jobTitle: 'Cybersecurity Analyst',
        department: 'Security',
        contact: 'lucas.hall@company.com',
        location: 'New York',
      },
      {
        id: 19,
        name: 'Ella King',
        jobTitle: 'AI Engineer',
        department: 'Engineering',
        contact: 'ella.king@company.com',
        location: 'San Francisco',
      },
      {
        id: 20,
        name: 'Jack Scott',
        jobTitle: 'Sales Manager',
        department: 'Sales',
        contact: 'jack.scott@company.com',
        location: 'London',
      },
    ];

    const users = [
      {
        id: 1,
        username: 'admin',
        password: 'admin',
        role: 'admin',
      },
      { id: 2, username: 'user', password: 'password', role: 'employee' },
    ];

    return { employees, users };
  }

  post(reqInfo: RequestInfo) {
    if (reqInfo.url.endsWith('/login')) {
      const body = reqInfo.utils.getJsonBody(reqInfo.req); // Extract body from request
      const { username, password } = body;
      const users = this.createDb().users.find(
        (user: any) => user.username === username && user.password === password
      );
      if (users) {
        const responseBody = { token: 'mock-auth-token', role: users.role }; // Return mock token and role
        return reqInfo.utils.createResponse$(() => ({
          body: responseBody,
          status: 200,
        }));
      } else {
        return reqInfo.utils.createResponse$(() => ({
          status: 401,
          body: { message: 'Invalid credentials' },
        }));
      }
    }
    return undefined; // Handle other POST requests
  }
}
