import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Role } from '../models/role';
import { User } from '../models/user';
import { environment } from '../../environments/environment';




@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>; // Talk about why this should be accessed directly https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/ XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    public user: Observable<User>;
    private privateKey: string; 
    private users: any = [
        { id: 1, username: 'tutor1', password: 'tutor1', firstName: 'Terry', lastName: 'Smith', role: Role.Tutor },
        { id: 2, username: 'tutor2', password: 'tutor2', firstName: 'Tina', lastName: 'Walters', role: Role.Tutor },
        { id: 3, username: 'student1', password: 'student1', firstName: 'Lucy', lastName: 'Higgins', role: Role.Student },
        { id: 4, username: 'student2', password: 'student2', firstName: 'James', lastName: 'Roberts', role: Role.Student }
    ]; // THis data structure represents the data held within a user database

    constructor(private router: Router, private http: HttpClient) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        const user = this.users.find(x => x.username === username && x.password === password);
        if (!user) throw new Error('Username or password is incorrect');
        else
        {
            let userObject: User = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                token: 'fake-jwt-token,' + user.id + ',' + user.role
            };
            
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(userObject));
            this.userSubject.next(userObject);
            return userObject;
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/loginPage']);
    }
}