import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeWithDrwalService {

  constructor(private http:HttpClient) { }


getAllBranches(){

  return this.http.get('https://localhost:7071/api/LabBranches/getAllBranches')
}

}
