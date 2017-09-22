import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';


declare var $: any;
declare var layer: any;
declare var Highcharts: any;
var homePage: any;

@Component({
    selector   : 'page-home',
    templateUrl: './home.html',
    styleUrls: ['./home.scss']
})
export class HomePage {
    orderStatisticsCount:any={
      todayOrder:"",
      PayCount:"",
      WithdrawCount:"",
      STBRollOut:"",
      STBExchange:""
    };
    userCount:any={
      userStatistics:{
        balance:"",
        score:"",
        virtualCoin:"",
        userCount:""
      },
      UserWithdrawCount:"",
      toDayuserCount:""
    };
    showTime:any = new Date();
    highChartOptions:any={};
    constructor(private httpService:HttpService,private aroute:ActivatedRoute) {
        this.aroute.params.subscribe( params  => {
            this.showTime = new Date();
        });
        homePage=this;
        //this.orderStatistics();
        //this.report();
    }

    loadData(){

    }

    orderStatistics(){
      this.httpService.get({
            url:'/homePage/orderStatistics',
            data:[]
      }).subscribe((data:any)=>{
            if(data.code === "0000"){
                this.orderStatisticsCount=Utils.copyObject(data.data);
            }
      });
      this.httpService.get({
            url:'/homePage/operationStatistics',
            data:[]
      }).subscribe((data:any)=>{
            if(data.code === "0000"){
                this.userCount=Utils.copyObject(data.data);
            }
      });

    }

    report(){
      this.highChartOptions.chart={};
      this.highChartOptions.chart.type="column";
      this.highChartOptions.title={};
      this.highChartOptions.title.text="最近6个月交易金额";
      this.highChartOptions.xAxis={};
      this.highChartOptions.xAxis.categories=["月份"];
      this.highChartOptions.yAxis={};
      this.highChartOptions.yAxis.title={};
      this.highChartOptions.yAxis.title.text="交易成功金额";
      var series1:any={};
      series1.name="1月份";
      series1.data=[1, 0, 4];
      var series2:any={};
      series2.name="2月份";
      series2.data=[5, 7, 3];
      this.highChartOptions.series=[series1,series2];
      Highcharts.chart("container",homePage.highChartOptions);
    }
}
