import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loggedInEmployee: any;
  ngOnInit(): void {
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  constructor(
    public authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}
}
