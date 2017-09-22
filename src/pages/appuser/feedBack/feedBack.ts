import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var $: any;
declare var layer: any;
var walletOrderPage: any;

@Component({
    selector   : 'page-feedBack',
    templateUrl: './feedBack.html',
    styleUrls: ['./feedBack.scss']
})
export class FeedBackPage {
    find:any={
      suid:0,
      ruid:0
    };
    upUser:any={};
    editDate:any={};
    showTime:any = new Date();
    constructor(private router:Router,private httpService:HttpService,private aroute:ActivatedRoute,private utils:Utils) {
        this.aroute.params.subscribe( params  => {
            this.showTime = new Date();
        });
        walletOrderPage=this;
        this.loadData();
    }

    /**
    * 加载数据
    */
    loadData(){
        this.httpService.pagination({
            url:'/muser/feedbacklist',
            data:this.find
        });
    }
}
