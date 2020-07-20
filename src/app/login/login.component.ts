import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../services/AuthenticationService';
import {User} from '../_models/user';
import {first} from 'rxjs/operators';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loginStatus: boolean;
    private user: User;
    loading = false;
    submitted = false;
    error = '';

    constructor(private http: HttpClient,
                private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        // this.loginStatus = true;

        this.loginForm = new FormGroup({
            user_email: new FormControl(null),
            user_password: new FormControl(null)
        });
    }

    onSubmit() {
        console.log("login ")
        this.submitted = true;
        this.loading = true;
        this.user = {
            'email': this.loginForm.get('user_email').value,
            'password': this.loginForm.get('user_password').value
        }
        this.loading = true;
        this.authenticationService.login(this.user)
            .pipe(first())
            .subscribe(
                data => {
                    this.authenticationService.currentUserId = data['user_id'];
                    this.router.navigateByUrl('/dashboard');
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });


    }
}
