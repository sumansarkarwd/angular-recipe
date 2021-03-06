import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
    constructor( private router: Router) {}
    token: string;
    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(
            (error) => console.log(error),
        );
    }
    loginUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {
                this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token: any) => this.token = token
                );
            }
        )
        .catch(
            error => console.log(error)
        );
    }
    logout() {
        firebase.auth().signOut();
        this.token = null;
        this.router.navigate(['/login']);
    }
    getToken() {
        firebase.auth().currentUser.getIdToken()
        .then(
            (token: any) => this.token = token
        );
        return this.token;
    }
    isAuthenticated() {
        return this.token != null;
    }
}
