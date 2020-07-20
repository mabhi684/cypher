import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/AuthenticationService';





@Component({
  selector: 'app-add-tool',
  templateUrl: './add-tool.component.html',
  styleUrls: ['./add-tool.component.scss']
})
export class AddToolComponent implements OnInit {

    addToolForm: FormGroup;
    toolName: any;
    getToolNameUrl = 'https://api.seostore.co.in/cp/v1/tools';
    private addToolDetails;
    private tool_id: any;
  constructor(private http: HttpClient, private router: Router, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
      this.http.get<JSON>(this.getToolNameUrl).subscribe(result => {
          console.log(result['result']);
          this.toolName = result['result'];
      });
      this.addToolForm = new FormGroup({
          tool_name: new FormControl('Tool Name'),
          user_email: new FormControl(null),
          user_password: new FormControl(null),
          expiry: new FormControl(null),
          max_users_allowed: new FormControl(null)
      });
  }



    onSubmit() {
      console.log('abhinav calling get tool');
        // console.log(this.addToolForm);
        // logic to redirect to addTool post successful tool registration
        // bfcbbea2-cb15-11ea-a243-0242ac110005
        this.addToolDetails = {
            'user_id': this.addToolForm.get('user_email').value,
            'password': this.addToolForm.get('user_password').value,
            'expiry': this.addToolForm.get('expiry').value,
            'max_allowed_user': this.addToolForm.get('max_users_allowed').value
        };
        this.tool_id = this.addToolForm.get('tool_name').value
        this.http.post<JSON>('https://api.seostore.co.in/cp/v1/tools/' + this.tool_id + '/' + this.authenticationService.currentUserId, this.addToolDetails).pipe().subscribe(result => {
            if (result['status'] === 'success') {
                console.log('success');
                this.router.navigateByUrl('/addTool');
            } else {
                // re-route to login with message
                console.log('error');
            }
        });

    }
}
