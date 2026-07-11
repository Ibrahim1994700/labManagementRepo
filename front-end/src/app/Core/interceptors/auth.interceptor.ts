import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { DataService } from '../../shared/Services/data.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  
var SahredData=inject(DataService)

let ExistToken=null
const authToken = SahredData.accessToken.subscribe((token) => {
  ExistToken= token;
});

// Clone the request and attach the Authorization header if token exists
const authReq = authToken
  ? req.clone({ setHeaders: { Authorization: `Bearer ${ExistToken}` }   })
  : req;

// Forward the modified request to the next handler in the chain
return next(authReq);

};
