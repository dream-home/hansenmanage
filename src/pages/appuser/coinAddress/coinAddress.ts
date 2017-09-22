import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var $: any;
declare var layer: any;
var coinAddressPage: any;

@Component({
    selector   : 'page-coinAddress',
    templateUrl: './coinAddress.html',
    styleUrls: ['./coinAddress.scss']
})
export class CoinAddressPage {
    find:any={
      uid:"",
      phone:""
    };
    upUser:any={};
    editDate:any={};
    showTime:any = new Date();
    subData:any={};
    constructor(private router:Router,private httpService:HttpService,private aroute:ActivatedRoute,private utils:Utils) {
        this.aroute.params.subscribe( params  => {
            this.showTime = new Date();
        });
        coinAddressPage=this;
        this.loadData();
    }

    /**
    * 加载数据
    */
    loadData(){
        this.httpService.pagination({
            url:'/userDetail/list',
            data:this.find
        });
    }


}
