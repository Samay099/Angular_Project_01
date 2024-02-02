import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit 
{
  loginForm!: FormGroup;

  constructor(private formBuilder : FormBuilder ,private _router:Router, private _http : HttpClient){ }

 
  ngOnInit() : void
  {
    this.loginForm = this.formBuilder.group({

      email : ['',[Validators.email,Validators.required]],
      password : ['',[Validators.required]],
    })
  }



  logIn()
  {
    console.log(this.loginForm.value);
      alert("Marvellous" + ' logged in successfully');
      this._router.navigate(['/restaurent']);
      this.loginForm.reset();
  }
}
