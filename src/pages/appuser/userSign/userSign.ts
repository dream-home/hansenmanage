import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var $: any;
declare var layer: any;
var userPage: any;

@Component({
    selector   : 'page-userSign',
    templateUrl: './userSign.html',
    styleUrls: ['./userSign.scss']
})
export class UserSignPage {
    find:any={
      uid:"",
      mobile:"",
      nickName:"",
      name:"",
      status:""
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
            url:'/userSign/list',
            data:this.find
        });
    }

}
