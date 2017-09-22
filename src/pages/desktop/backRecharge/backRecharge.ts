import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';

declare var $: any;
declare var layer: any;
var paraPage: any;

@Component({
    selector   : 'page-task',
    templateUrl: './backRecharge.html',
    styleUrls: ['./backRecharge.scss']
})
export class BackRechargePage {
    find:any={
      uid:"",
      phone:"",
      nickName:"",
      orderType:"",
      confirmAmt:"",
      status:"" ,
      startTime:"",
      endTime:""
    };
    showTime:any = new Date();
    path:string;
    imgPath:string;
    subData:any={};
    constructor(private httpService:HttpService,private aroute:ActivatedRoute,private utils:Utils) {
        this.aroute.params.subscribe( params  => {
            this.showTime = new Date();
        });
        this.path = Utils.FILE_SERVE_URL;
        this.loadData();
        paraPage=this;
    }

    /**
    * 加载数据
    */
    loadData(){
        this.httpService.pagination({
            url:'/charge/list',
            data:this.find
        });
    }

    /**
    * 弹出新增面板
    */
    showAddPanel(){
        this.subData = {
            uid: '',
            tradeAmt:0,
            payAmt: 0,
            equityAmt: 0,
            activeCodeNo: 0,
            registerCodeNo:0
        };
        layer.open({
            title: "管理员充值",
            btn: ["保存","退出"],
            type: 1,
            closeBtn: 0,
            shade: 0,
            fixed: true,
            shadeClose: false,
            resize: false,
            area: ['500px','auto'],
            content: $("#editPanel"),
            yes: function(index:number){
                if(paraPage.validator()){
                    paraPage.httpService.post({
                        url:'/charge/add',
                        data:paraPage.subData
                    }).subscribe((data:any)=>{
                        layer.closeAll();
                        if(data.code==='0000'){
                            //新增成功
                           layer.msg(data.message,{
                               icon: '1',
                               time: 2000
                           },function(){
                               paraPage.loadData();
                           });
                        }else if(data.code==='9999'){
                            Utils.show(data.message);
                        }else{
                            Utils.show("系统异常，请联系管理员");
                        }
                    });
                }
            }
        });
    }


      /**
      * 弹出编辑面板
      */
      showEditPanel(item:any){
          this.subData = Utils.copyObject(item);
          layer.open({
              title: "管理员充值",
              btn: ["保存","退出"],
              type: 1,
              closeBtn: 0,
              shade: 0,
              fixed: true,
              shadeClose: false,
              resize: false,
              area: ['500px','auto'],
              content: $("#editPanel"),
              yes: function(index:number){
                  if(paraPage.validator()){
                      paraPage.httpService.post({
                          url:'/charge/update',
                          data:paraPage.subData
                      }).subscribe((data:any)=>{
                          layer.closeAll();
                          if(data.code==='0000'){
                              //修改成功
                             layer.msg(data.message,{
                                 icon: '1',
                                 time: 2000
                             },function(){
                                 paraPage.loadData();
                             });
                          }else if(data.code==='9999'){
                              Utils.show(data.message);
                          }else{
                              Utils.show("系统异常，请联系管理员");
                          }
                      });
                  }
              }
          });
      }

    showPath(img:any){
        this.imgPath=img.imgPath;
        layer.open({
            title: "用户反馈图片",
            type: 1,
            closeBtn: 1,
            shade: 0,
            fixed: true,
            shadeClose: true,
            resize: false,
            area: ['800px','700px'],
            content: $("#editPanel")
        });
    }


    validator(){
        if(Utils.isEmpty(this.subData.uid)){
            layer.tips('会员uid不能为空', '#uid',{tips: 1});
            $("#name").focus();
            return false;
        }

        if(Utils.isEmpty(this.subData.supperPass)){
            layer.tips('超级密码不 能为空', '#supperPass',{tips: 1});
            $("#supperPass").focus();
            return false;
        } 
        return true;
    }
}
