import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestaurentData } from '../restaurant-dash/restaurent.model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css'
})
export class DialogBoxComponent implements OnInit
{
  formValue!: FormGroup;
  restaurentModelObj : RestaurentData = new RestaurentData;
  showAdd!:boolean;
  showUpdate!:boolean;


    constructor(@Inject(MAT_DIALOG_DATA) public data : {
                                                          id: any, 
                                                          name : any,
                                                          email: any,
                                                          address : any,
                                                          mobile : any,
                                                          services : any,
                                                          button : boolean,
                                                        } 
      ,private dialogRef : MatDialogRef<DialogBoxComponent>,private formBuilder : FormBuilder,private api : ApiService){}
   
  ngOnInit() : void 
  {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
      
    } 
    )

    this.dialogRef.afterOpened()
    {
      if(this.data.button == true)
      {
        this.showAdd = true;
        this.showUpdate = false;
      }
      else if(this.data.button == false)
      {
        this.showAdd = false;
        this.showUpdate = true;
      }
      this.restaurentModelObj.id = this.data.id;
      this.formValue.controls['name'].setValue(this.data.name);
      this.formValue.controls['email'].setValue(this.data.email);
      this.formValue.controls['address'].setValue(this.data.address);
      this.formValue.controls['mobile'].setValue(this.data.mobile);
      this.formValue.controls['services'].setValue(this.data.services);
    }
  }
  
  onClose():void
  {
    this.dialogRef.close();
  }

  updateRest()
  { 
    console.log("clicked")

    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurent(this.restaurentModelObj.id,this.restaurentModelObj).subscribe((res:any) =>{
      alert("Restaurant Updated Successfully");
      this.formValue.reset();
      
      let ref= document.getElementById('close');
      ref?.click();

      
    })
  }

  addRest()
  {
    console.log("clicked")

    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurent(this.restaurentModelObj).subscribe((res:any) =>{
      console.log(res)
      alert("Restaurant Added Successfully");
      this.formValue.reset();
      
      let ref= document.getElementById('close');
      ref?.click();

      
    },err=>{
      console.log(err)
      alert("Failed to Add Restaurant");
    }
    )
  }



} 
