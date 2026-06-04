import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private authService:AuthService,private route:Router) {}
  ngOnInit(): void {
    this.generateLoginForm();
  }

  generateLoginForm() {
    this.loginForm = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required]),
      client: new FormGroup(
        {
          Id: new FormControl('36265F7F-070A-411A-BC1D-1ED9ABB3C9F0'),
          Name: new FormControl('Web Application 1'),
          clientURL: new FormControl('https://client1.com'),
          clientId: new FormControl('Client1'),
        },
        [Validators.required],
      ),
    });
  }

  loginUser() {
    this.route.navigate(['Patient-Home/main-user-page']);
    // if (this.loginForm.invalid) {
    //   this.loginForm.markAllAsTouched();
    // } else {
    //   this.authService.loginUser(this.loginForm.value);
    // }
  }
}
