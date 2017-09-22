import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var $: any;
declare var layer: any;
var walletOrderPage: any;

@Component({
    selector   : 'page-cointOutOrder',
    templateUrl: './cointOutOrder.html',
    styleUrls: ['./cointOutOrder.scss']
})
export class CointOutOrderPage {
    find:any={
      orderNo:"",
      // mobile:"",
      // nickName:"",
      // name:"",
      status:"",
      currencyType:""
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
            url:'/coin/coinOutList',
            data:this.find
        });
    }

    //审核通过
    check(item:any){
      layer.confirm('确认审核通过', {
          btn: ['确定','取消'] //按钮
      }, function(){
          var upUser:any={};
          upUser.orderId=item.prepayId;
          if(item.status == 1){
            upUser.status=1
          }else{
            alert("用户状态错误");
            return false;
          }
          walletOrderPage.httpService.post({
              url:'/coin/coinverfy',
              data:upUser
          }).subscribe((data:any)=>{
              layer.closeAll();
              if(data.code==='0000'){
                  //删除成功
                 layer.msg(data.message,{
                     icon: '1',
                     time: 2000
                 },function(){
                     walletOrderPage.loadData();
                 });
              }else if(data.code==='9999'){
                  Utils.show(data.message);
              }else{
                  Utils.show("系统异常，请联系管理员");
              }
          });
      });
    }

    //审核不通过
    unCheck(item:any){
      layer.confirm('确认审核不通过', {
          btn: ['确定','取消'] //按钮
      }, function(){
          var upUser:any={};
          upUser.orderId=item.prepayId;
          if(item.status == 1){
            upUser.status=3
          }else{
            alert("用户状态错误");
            return false;
          }
          walletOrderPage.httpService.post({
              url:'/coin/coinverfy',
              data:upUser
          }).subscribe((data:any)=>{
              layer.closeAll();
              if(data.code==='0000'){
                  //删除成功
                 layer.msg(data.message,{
                     icon: '1',
                     time: 2000
                 },function(){
                     walletOrderPage.loadData();
                 });
              }else if(data.code==='9999'){
                  Utils.show(data.message);
              }else{
                  Utils.show("系统异常，请联系管理员");
              }
          });
      });
    }

}
