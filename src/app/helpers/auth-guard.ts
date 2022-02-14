// This class prevents non logged in users from accesing pages they are not authorized to access. 
// It will redirect users to the login page.

// External Imports
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Internal Imports
import { AuthenticationService } from '../services/authentication-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.userValue;
        if (user) {
            // Check if route is restricted by role.
            if (route.data['roles'] && route.data['roles'].indexOf(user.role) === -1) {
                // Role not authorised so redirect to home page.
                this.router.navigate(['/']);
                return false;
            }

            // Authorised so return true.
            return true;
        }

        // Not logged in so redirect to login page with the return url.
        this.router.navigate(['/loginPage'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}