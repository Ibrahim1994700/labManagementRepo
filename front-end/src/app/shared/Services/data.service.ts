import { isPlatformBrowser } from '@angular/common';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import CryptoJS from 'crypto-js';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    public http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  getLocalStorageItem(item: string) {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(item);
    }
    return;
  }

  setLocalStorageItem(Key: string, data: any) {
    if (isPlatformBrowser(this.platformId))
      return localStorage.setItem(Key, data);
  }

  CheckLocalStorageItem(key: any) {
    return localStorage.getItem(key) != null ? true : false;
  }

  DecodeToken(key: any) {
    var token=localStorage.getItem(key);
    if(token)
    {
       var decode:any= jwtDecode(token);
       return decode.userId
    }
  }

  Check() {
    return this.http.get(
      'https://localhost:7071/api/LabService/GetAllServices',
    );
  }

  removeLocalStorage(item: string) {
    localStorage.removeItem(item);
  }
}
