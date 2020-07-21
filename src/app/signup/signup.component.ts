import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;
    private signupDetails: { password: any; name: any; email: any; phone: any; };
    signupStatus: boolean;


    constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
      this.signupStatus = true;
      this.signupForm = new FormGroup({
          user_name: new FormControl(null),
          user_email: new FormControl(null),
          user_password: new FormControl(null),
          user_phone: new FormControl(null)
      });
  }

    onSubmit() {
        console.log(this.signupForm);
        console.log(this.signupForm.get('user_name').value);
        this.signupDetails = {
            'email': this.signupForm.get('user_email').value,
            'name': this.signupForm.get('user_name').value,
            'password': this.signupForm.get('user_password').value,
            'phone': this.signupForm.get('user_phone').value
        };
        // logic to redirect to login post successful signup
        this.http.post<JSON>('https://api.seostore.co.in/cp/v1/reseller', this.signupDetails).pipe().subscribe(result => {
            if (result['status'] === 'success') {
                console.log('routing to login');
                this.router.navigateByUrl('/login');
            } else {
                this.signupStatus = false;
                // re-route to login with message
            }
        });

    }
}
