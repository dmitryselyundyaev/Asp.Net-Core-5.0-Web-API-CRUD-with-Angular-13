import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service:PaymentDetailService ,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  OnSubmit(form:NgForm){
    if(this.service.formData.paymentDetailId==0)
      this.insertRecord(form);
      
    else
      this.updateRecord(form);
    }

  insertRecord(form:NgForm){
    this.service.postPaymentDetail().subscribe(
      res =>{
        this.resetForm(form);
        this.toastr.success('Submitted seccessfully');
        this.service.refreshList();
      },
      err => {console.log(err);}
    )
  }
  updateRecord(form:NgForm){
    this.service.putPaymentDetail().subscribe(
      res =>{
        this.resetForm(form);
        this.toastr.info('Updated seccessfully');
        this.service.refreshList();
      },
      err => {console.log(err);}
    )
  }
  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }
}
