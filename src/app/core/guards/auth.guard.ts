import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const adminGuard: CanActivateFn = () => {
    const  authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isAdmin()) {
        return true;
    }else{
        router.navigate(["/auth/login"]);
        return false;
    }
};

export const userGuard: CanActivateFn = () => {
    const  authService = inject(AuthService);
    const router = inject(Router);
    if (authService.getRole()==='USER' || authService.isAdmin()) {
        return true;
    }else{
        router.navigate(["/auth/login"]);
        return false;
    }
};
