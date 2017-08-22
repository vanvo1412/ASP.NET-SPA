import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
        username: new FormControl(),
        password: new FormControl()
    })

    constructor() { }

    ngOnInit() { }

    redirect(){
        console.log(this.loginForm.value);  // { first: '', last: '' }
    }
}