import { Component,OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { RestaurentData } from './restaurent.model';




@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css','../../assets/bootstrap.min.css']
  
})
export class RestaurantDashComponent 
{
  formValue! : FormGroup;
  restaurentModelObj : RestaurentData = new RestaurentData;
  allRestaurentData : any;
  dialogRef : any;
  showAdd!:boolean;


  constructor(private formBuilder:FormBuilder, private api:ApiService, private dialog : MatDialog){}

  ngOnInit(): void
  {
    this.formValue = this.formBuilder.group({
      name : [''],
      email : [''],
      address : [''],
      mobile : [''],
      service: [''],
    })
    this.getAllData()
  }

  getAllData()
  {
    this.api.getRestaurent().subscribe((res:any) => {
      this.allRestaurentData = res;
    },err=> {
      console.log(err);
    })
  }

  deleteRest(data:any)
  {
    this.api.deleteRestaurent(data).subscribe((res:any) => {
      console.log(res);
    },err=> {
      console.log(err);
    })
    this.getAllData();
  }

  openDialog(Restdata?: any) : void
  {
      if(Restdata != undefined)
      {
        this.showAdd = false;
     

        this.dialogRef = this.dialog.open(DialogBoxComponent , {
          // size of dialog box
          height: '600px',
          width: '650px',
          // passing data to dialog-box
          data : {
            id : Restdata.id,
            name : Restdata.name,
            email : Restdata.email,
            address : Restdata.address,
            mobile : Restdata.mobile,
            services : Restdata.services,
            button : this.showAdd
          }
         })
      }
      else if(Restdata == undefined)
      {
        this.showAdd = true;
      
        this.dialogRef = this.dialog.open(DialogBoxComponent , {
          // size of dialog box
          height: '600px',
          width: '650px',
          // passing data to dialog-box
          data : {
            id : this.allRestaurentData.id,
            name : this.allRestaurentData.name,
            email : this.allRestaurentData.email,
            address : this.allRestaurentData.address,
            mobile : this.allRestaurentData.mobile,
            services : this.allRestaurentData.services,
            button : this.showAdd
          }
         })
      }

     this.dialogRef.afterClosed().subscribe((result : any) => {
      console.log('Dialog was closed');
      this.getAllData();
     })

      
  }

  


  

}




