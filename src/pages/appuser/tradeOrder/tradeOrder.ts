import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var $: any;
declare var layer: any;
var userPage: any;

@Component({
    selector   : 'page-tradeOrder',
    templateUrl: './tradeOrder.html',
    styleUrls: ['./tradeOrder.scss']
})
export class TradeOrderPage {
    find:any={
      uid:"",
      phone:"",
      nickName:"",
      name:"",
      status:"",
      tradeOrderType:"",
      cardGrade:""
    };
    upUser:any={};
    editDate:any={};
    showTime:any = new Date();
    constructor(private router:Router,private httpService:HttpService,private aroute:ActivatedRoute,private utils:Utils) {
        this.aroute.params.subscribe( params  => {
            this.showTime = new Date();
        });
        userPage=this;
        this.loadData();
    }

    /**
    * 加载数据
    */
    loadData(){
        this.httpService.pagination({
            url:'/tradeOrder/orderlist',
            data:this.find
        });
    }

}
