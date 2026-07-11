import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataService } from '../../../shared/Services/data.service';
import { Router } from '@angular/router';
import { read } from 'fs';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  dataService = inject(DataService);
  route = inject(Router);

  loginUser(data: any) {
    this.http
      .post('https://localhost:7071/api/Users/LoginUser', data,{ withCredentials: true })
      .subscribe({
        next: (res: any) => {
          if (res.succeeded && res.data.token && res.data.refreshToken) {
            // this.dataService.removeLocalStorage('token');
            // this.dataService.setLocalStorageItem('token', res.data.token);
            this.dataService.existToken.next(res.data.token);
            this.dataService.accessToken.next(res.data.token);

            this.route.navigate(['/Patient-Home']);
          }
        },
        error: (error) => {
          alert('somethigs error');
        },
      });
  }

  GetRefreshtoken(token?: any) {
    var data = {
      expiredToken: token,
      clientId: '36265F7F-070A-411A-BC1D-1ED9ABB3C9F0',
      clientUrl: 'https://client1.com',
    //  userId: this.dataService?.DecodeToken('token').userId,
    };
    return this.http
      .post('https://localhost:7071/api/Auth/RefreshToken',{}, {
        withCredentials: true,
      })
      .pipe(
        tap((res: any) => {
          this.dataService.accessToken.next(res.token);
        }),
      );
  }

 
}
