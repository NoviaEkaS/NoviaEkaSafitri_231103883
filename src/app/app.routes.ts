import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { NgModule } from '@angular/core';
import { Admin } from './admin/admin';
import { Dashboard2 } from './dashboard2/dashboard2';
import { Dashboard3 } from './dashboard3/dashboard3';
import { Mahasiswa } from './mahasiswa/mahasiswa';
import { otentikasiGuard } from './otentikasi-guard';
import { Forex } from './forex/forex';

export const routes: Routes = [
    { path: "dashboard", component: Dashboard, canActivate: [otentikasiGuard] },
    { path: "dashboard2", component: Dashboard2, canActivate: [otentikasiGuard] },
    { path: "forex", component: Forex, canActivate: [otentikasiGuard] },
    { path: "dashboard3", component: Dashboard3},
    { path: "login", component: Login },
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: 'admin', component: Admin },
    { path: "mahasiswa", component: Mahasiswa, canActivate: [otentikasiGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }