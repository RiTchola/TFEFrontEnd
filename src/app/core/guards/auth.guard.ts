import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { RoleType } from 'src/app/shared/interfaces/roleType';

export const adminGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isAdmin()) {
        return true;
    } else {
        router.navigate(["/auth/login"]);
        return false;
    }
};

export const userGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.getRole() === 'USER' || authService.isAdmin()) {
        return true;
    } else {
        router.navigate(["/auth/login"]);
        return false;
    }
};

export const establissementGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.getRole().toLowerCase() === RoleType.etablissement.toLowerCase() || authService.isAdmin()) {
        return true;
    } else {
        router.navigate(["/notfound"]);
        return false;
    }
};

export const residentGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.getRole().toLowerCase() === RoleType.resident.toLowerCase() || authService.isAdmin()) {
        return true;
    } else {
        router.navigate(["/notfound"]);
        return false;
    }
};

export const contactPersonGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.getRole().toLowerCase() === RoleType.personnecontact.toLowerCase() || authService.isAdmin()) {
        return true;
    } else {
        router.navigate(["/notfound"]);
        return false;
    }
};
