import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const otentikasiGuard: CanActivateFn = (route, state) => {
  console.log("Otentikasi dimulai");

  var userId = inject(CookieService).get("userId");
  console.log("userId: " + userId);

  if (userId == null) {
    // Anggap belum login
  } else if (userId == "unfined") {
    // Anggap belum login
  } else if (userId == "") {
    // Anggap belum login
  } else {
    return true; // Sudah login
  }
  
  inject(Router).navigate(["/login"]);
  return false;
};
