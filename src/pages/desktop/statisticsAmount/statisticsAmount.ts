import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';

declare var $: any;
declare var layer: any;
var paraPage: any;

@Component({
    selector   : 'page-task',
    templateUrl: './statisticsAmount.html',
    styleUrls: ['./statisticsAmount.scss']
})
export class StatisticsAmountPage {
    statisticInfo:any={};
    showTime:any = new Date();
    // statisticInfo:any={};
    constructor(private httpService:HttpService,private aroute:ActivatedRoute,private utils:Utils) {
        this.aroute.params.subscribe( params  => {
            this.showTime = new Date();
        });
        this.loadData();
        paraPage=this;
    }

    /**
    * 加载数据
    */
    loadData(){

        this.httpService.get({
            url:'/bill/statistic',
            data:[]
        }).subscribe((data:any)=>{
            if(data.code === "0000"){
                console.log(data.data);
                console.error("错误"+data.data.currentOrderCount);
                // this.statisticInfo = data.data;
                this.statisticInfo=data.data;
                console.log(this.statisticInfo);
            }
        });
    }

}
