import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var $: any;
declare var layer: any;
var walletOrderPage: any;

@Component({
    selector   : 'page-codeOrder',
    templateUrl: './codeOrder.html',
    styleUrls: ['./codeOrder.scss']
})
export class CodeOrderPage {
    find:any={
      suid:"",
      ruid:""
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
            url:'/coin/codelist',
            data:this.find
        });
    }
}
