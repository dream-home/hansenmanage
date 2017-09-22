import { Component } from "@angular/core";
import { HttpService } from "../../../providers/HttpService";
import { Utils } from "../../../providers/Utils";
import { ActivatedRoute } from '@angular/router';

declare var $: any;
declare var layer: any;
var taskPage: any;

@Component({
    selector   : 'page-task',
    templateUrl: './task.html',
    styleUrls: ['./task.scss']
})
export class TaskPage {
    find:any={
      uid:"",
      mobile:"",
      nickName:"",
      userName:"",
      content:"",
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
        taskPage=this;
    }

    /**
    * 加载数据
    */
    loadData(){
        this.httpService.pagination({
            url:'/task/list',
            data:this.find
        });
    }
    //删除任务
    showDelPanel(item:any){
      layer.confirm('删除为不可逆操作,您确定要删除此数据吗？', {
          btn: ['确定','取消'] //按钮
      }, function(){
          var upUser:any={};
          upUser.id=item.id;
          taskPage.httpService.post({
              url:'/task/delete',
              data:upUser
          }).subscribe((data:any)=>{
              layer.closeAll();
              if(data.code==='0000'){
                  //删除成功
                 layer.msg(data.message,{
                     icon: '1',
                     time: 2000
                 },function(){
                     taskPage.loadData();
                 });
              }else if(data.code==='9999'){
                  Utils.show(data.message);
              }else{
                  Utils.show("系统异常，请联系管理员");
              }
          });
      });
    }

    /**
    * 弹出新增面板
    */
    showAddPanel(){
        this.subData = {
            name: '',
            discription: '',
            // rewardNo:'',
            // link: '',
            taskType: '',
            remark: '',
            status: '1',
            linkImgPath:''
        };
        layer.open({
            title: "添加任务清单",
            btn: ["保存","退出"],
            type: 1,
            closeBtn: 0,
            shade: 0,
            fixed: true,
            shadeClose: false,
            resize: false,
            area: ['550px','auto'],
            content: $("#editPanel"),
            yes: function(index:number){
                if(taskPage.validator()){
                    taskPage.httpService.post({
                        url:'/task/add',
                        data:taskPage.subData
                    }).subscribe((data:any)=>{
                        layer.closeAll();
                        if(data.code==='0000'){
                            //新增成功
                           layer.msg(data.message,{
                               icon: '1',
                               time: 2000
                           },function(){
                               taskPage.loadData();
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
              title: "修改任务清单",
              btn: ["保存","退出"],
              type: 1,
              closeBtn: 0,
              shade: 0,
              fixed: true,
              shadeClose: false,
              resize: false,
              area: ['550px','auto'],
              content: $("#editPanel"),
              yes: function(index:number){
                  if(taskPage.validator()){
                      taskPage.httpService.post({
                          url:'/task/update',
                          data:taskPage.subData
                      }).subscribe((data:any)=>{
                          layer.closeAll();
                          if(data.code==='0000'){
                              //修改成功
                             layer.msg(data.message,{
                                 icon: '1',
                                 time: 2000
                             },function(){
                                 taskPage.loadData();
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
            area: ['800px','500px'],
            content: $("#editPanel")
        });
    }


    validator(){
        if(Utils.isEmpty(this.subData.name)){
            layer.tips('任务标题不能为空', '#names',{tips: 1});
            $("#name").focus();
            return false;
        }
        if(Utils.isEmpty(this.subData.taskType)){
            layer.tips('任务类型不能为空', '#taskType',{tips: 1});
            $("#value").focus();
            return false;
        }
        return true;
    }
}
