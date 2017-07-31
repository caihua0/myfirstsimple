<template>
<div>

  
  <!-- 头部信息 -->
  <div id="head">

    <!-- infos： {{deviceinfo}}<br/> -->
    <!-- responses： {{responses}}<br/> -->
    <!-- commands： {{commands}}<br/> -->
    <div class="pannel">
      <div class="head">设备基本信息</div>
        <table class="table">
        <tr>
          <td>协议包类型(delimiter)</td><td><input type="text" name="type" v-model="deviceinfo.type"></td>
          <td>分隔符</td><td><input type="text" name="value" v-model="deviceinfo.value"></td>
          <td>头部字节</td>
          <td><input type="text" name="head" v-model="deviceinfo.head"></td>
        </tr>
        <tr>
          <td>命令起始位置</td><td><input type="text" name="commandindex" v-model="deviceinfo.commandindex"></td>
          <td>命令长度</td><td><input type="text" name="length" v-model="deviceinfo.length"></td>
          <td></td><td></td>
        </tr>
        </table>
        <div class="foot">
          <a class="a" v-bind:href="href" download="xml.txt" @click="ExportXml">下载</a>
        </div>
    </div>
    <!-- <vue-xlsx-table @on-click-ok="handleOk"></vue-xlsx-table> -->
    <!-- <input type="file" v-model="filePath"/> -->
  </div>
  <!-- <div>{{channels}}</div> -->
  <!-- <button v-on:click="result">log</button> -->

  <!-- response信息 -->
  <div class="pannel" v-for="(response,i) in responses">
    <div class="head">收到数据{{i+1}}:{{response.name}}</div>
    <!-- 命令名称<input type="text" name="responsename" v-model="response.name"> -->
    <div>
    <table class="table">

      <thead><tr>
      <th>#</th>
      <th>名称</th>
      <th>数据表示方式</th>
      <th>长度(字节数)</th>
      <th>字段含义</th>
      <th>数据结果类型</th>
      <th>数据映射(序号)</th>
      <th>默认值</th>
      <th>操作</th>
      </tr></thead>
      <tbody>
      <tr class="body" v-for="(resnode,index) in response.value"> 
        <!-- <div>{{resnode}}</div> -->
        <td>{{index+1}}</td>
        <td><input class="text" type="text" name="name" v-model="resnode.name" ></td>
        <td><input class="text" type="text" name="type" v-model="resnode.type" ></td>
        <td><input class="text" type="text" name="size" v-model="resnode.size" ></td>
        <td><input class="text" type="text" name="style" v-model="resnode.style" >  

           </td>
        <td><!-- <input type="text" name="datatype" v-model="resnode.datatype" > -->
            <select class="select" v-model="resnode.datatype">
             <option value="i">i</option>
             <option value="f">f</option>
             <option value="s">s</option>
             <option value="I">I</option>
             <option value="F">F</option>
             <option value="S">S</option>
            </select>
        </td>
        <td><input class="text" type="text" name="ref" v-model="resnode.ref" ></td>
        <td><input class="text" type="text" name="value" v-model="resnode.value" ></td>
        <td><button @click="delresponsenode(response.value,i,index)">删除</button>
        <button @click="addbefore(response.value,index)">插入</button></td>
      </tr>
      </tbody>
    </table>
    <div class="foot">

      <button v-on:click="addresponsenode(response.value,i)">添加</button>
      <input v-if="i===0" type="file" @change="ReadExcel">
      <input v-if="i===0" type="button" @click="ExportExcel" value="导入">
      <div class="right"><input  type="checkbox" v-model="response.isreplay"> 此消息是否需要回复</div>

    </div>
    </div>


    <div  v-if="response.isreplay">
    <table class="table">
      <thead><tr>
      <th>#</th>
      <th>名称</th>
      <th>数据表示方式</th>
      <th>数据映射(序号)</th>
      <th>字段含义</th>
      <th>默认值</th>
      <th>操作</th>
      </tr></thead>
      <tbody>
      <tr class="body" v-for="(resnode,index) in response.value2"> 
        <!-- <div>{{resnode}}</div> -->
        <td>{{index+1}}</td>
        <td><input class="text" type="text" name="name" v-model="resnode.name" ></td>
        <td><input class="text" type="text" name="type" v-model="resnode.type" ></td>
                <td><input class="text" type="text" name="ref" v-model="resnode.ref" ></td>
        <td><input class="text" type="text" name="style" v-model="resnode.style" ></td>
        <td><input class="text" type="text" name="value" v-model="resnode.value" ></td>
        <td><button @click="delresponsenode(response.value2,i,index)">删除</button>
        <button @click="addbefore(response.value2,index)">插入</button></td>
      </tr>
      </tbody>
    </table>
    <div class="foot">
      <button v-on:click="addresponsenode(response.value2,i)">添加</button>
    </div>
    </div>
  </div>
  


  <!-- command信息 -->

  <div class="pannel" v-for="(command,i) in commands">
    <div class="head">下发命令{{i+1}}:{{command.name}}</div>
      <!-- 命令名称<input type="text" name="commandname" v-model="command.name"> -->

      <table class="table">
        <thead><tr>
        <th>#</th>
        <th>名称</th>
        <th>数据表示方式</th> 
        <th>数据结果类型</th>
        <th>默认值</th>    
        <th>操作</th>
        </tr></thead>
        <tbody>
          <tr class="body" v-for="(commandnode,index) in command.value"> 
            <td>{{index+1}}</td>
            <td><input class="text" type="text" name="name" v-model="commandnode.name" ></td>
            <td><input class="text" type="text" name="type" v-model="commandnode.type" ></td>
            <td><input class="text" type="text" name="style" v-model="commandnode.style" ></td>
            <td><input class="text" type="text" name="value" v-model="commandnode.value" ></td>
            <td><button @click="delcommandnode(command.value,i,index)">删除</button>
            <button @click="addbefore(command.value,index)">插入</button></td>
          </tr>
        </tbody>
      </table>
      <div class="foot">
        <button v-on:click="addcommandnode(command.value,i)">添加</button>
      </div>
  </div>

  <!-- checkcode信息 -->
  <div class="pannel">
      <div class="head">校验码-checkcode</div>
      <!-- 命令名称<input type="text" name="commandname" v-model="command.name"> -->
      <table class="table">
        <thead><tr><th>#</th><th>名称</th><th>类型</th><th>参数</th></tr></thead>
        <tbody>
        <tr class="body">
          <td>1</td>
          <td><input class="text" type="text" name="name" v-model="checkcodes[0].name" ></td>
          <td><input class="text" type="text" name="type" v-model="checkcodes[0].type" ></td>
          <td><input class="text" type="text" name="value" v-model="checkcodes[0].value" ></td>

        </tr>
        <tr class="body">
          <td>2</td>
          <td><select class="select" v-model="checkcodes[1].name">
               <option selected value="asci">asci</option>
               <option value="banana"></option>
               <option value="watermelon">西瓜</option>
               </select></td>
          <td><input  class="text" type="text" name="type" v-model="checkcodes[1].type" ></td>
          <td></td>
        </tr>
        </tbody>
      </table>
<!--       <div class="foot">
        <button v-on:click="addcheckcodenode()">添加</button>
      </div> -->
  </div>
</div>
</template>

<script>
import xlsx from 'xlsx'
export default {
  name: 'app',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App',
      responses:[{name:"CurrentData",value:[{name:"node",type:"byte",size:"8",style:"",ref:"",datatype:"",value:""}],isreplay:false,value2:[{name:"node",type:"byte",size:"",style:"",ref:"",datatype:"",value:""}]},
                 {name:"ControlData",value:[{name:"node",type:"byte",size:"8",style:"",ref:"",datatype:"",value:""}],isreplay:false,value2:[{}]},
                 {name:"Heartbeat",value:[{name:"node",type:"byte",size:"8",style:"",ref:"",datatype:"",value:""}],isreplay:false,value2:[{}]}],
      commands:[{name:"CurrentData",value:[{name:"node",type:"byte",value:"00",style:""}]},
                {name:"ControlData",value:[{name:"node",type:"byte",value:"00",style:""}]}],
      deviceinfo:{type:"delimiter",value:"0D",commandindex:"5",length:"4",head:"7E",checkcodetype:"asci"},
      checkcodes:[{name:"data",type:"byte",value:"[Start],[End]"},{name:"asci",type:"byte"}],
      href:""
    }
  },
  methods:{
    addresponsenode:function(param,i){
      var response ={name:"node",type:"byte",size:"8",style:"",ref:"",datatype:"",value:""};
      param.push(response);
    },
    delresponsenode:function(param,i,index){
      param.splice(index,1);
    },
    addcommandnode:function(param,i){
      var command ={name:"node",type:"byte",size:"",style:"",ref:"",datatype:"",value:"00"};
      this.commands[i].value.push(command);
    },
    delcommandnode:function(param,i,index){
      this.commands[i].value.splice(index,1);
    },
    // addcheckcodenode:function(){
    //   var checkcode ={name:"node",type:"byte",value:""};
    //   this.checkcodes.push(checkcode);
    // },
    // delcheckcodenode:function(index){
    //   this.checkcodes.splice(index,1);
    // },
    addbefore:function(param,index){
        param.splice(index,0,{name:"node",type:"byte"});
        
    },
    //将excel添加进来
    ExportExcel:function(){
      for (var chi =0 ;chi< this.channels.length; chi++) {
        var r={}; 
        r.name=this.channels[chi].channelid;
        r.type=this.channels[chi].type;
        r.size=this.channels[chi].size;
        this.responses[0].value.push(r);
      }
    },
    //下载xml
    ExportXml:function(){
      var head='<?xml version="1.0" encoding="utf-8"?><protocol>'
      var foot='</protocol>'
      var infostr='<infos type="' +this.deviceinfo.type+ '" value="' +this.deviceinfo.value +'" commandindex="' +this.deviceinfo.commandindex+ '" length="' +this.deviceinfo.length +'" head="' +this.deviceinfo.head+ '"></infos>';
      var reslength = this.responses.length;
      //回复配置
      var responsesstr ="<responses>"; 
      for (var ri = 0; ri <  this.responses.length; ri++) {  
        responsesstr = responsesstr + '<response name="'+this.responses[ri].name+'">';

        responsesstr = responsesstr + '<revice>';
        for (var rj = 0; rj <  this.responses[ri].value.length; rj++){
          if(this.responses[ri].value[rj].name!=""&&typeof(this.responses[ri].value[rj].name) != "undefined"){
            responsesstr +='<resnode name="' +this.responses[ri].value[rj].name;
          }
          if(this.responses[ri].value[rj].type!=""&&typeof(this.responses[ri].value[rj].type) != "undefined"){
            responsesstr +='" type="' +this.responses[ri].value[rj].type;
          }
          if(this.responses[ri].value[rj].size!=""&&typeof(this.responses[ri].value[rj].size) != "undefined"){
            responsesstr +='" size="' +this.responses[ri].value[rj].size;
          }
          if(this.responses[ri].value[rj].style!=""&&typeof(this.responses[ri].value[rj].style) != "undefined"){
              responsesstr +='" style="' +this.responses[ri].value[rj].style;
          }
          if(this.responses[ri].value[rj].datatype!=""&&typeof(this.responses[ri].value[rj].datatype) != "undefined"){
              responsesstr +='" datatype="' +this.responses[ri].value[rj].datatype;
          }
          if(this.responses[ri].value[rj].ref!=""&&typeof(this.responses[ri].value[rj].ref)!= "undefined"){
              responsesstr +='" ref="' +this.responses[ri].value[rj].ref;
          }
          if(this.responses[ri].value[rj].value!=""&&typeof(this.responses[ri].value[rj].value) != "undefined"){
              responsesstr +='" value="' +this.responses[ri].value[rj].value;
          }
          responsesstr +='"></resnode>';
        }
        responsesstr = responsesstr + '</revice>';

        if(this.responses[ri].isreplay){
          responsesstr = responsesstr + '<reply>';
          for (var rk = 0; rk < this.responses[ri].value2.length; rk++) {
            if(this.responses[ri].value2[rk].name!=""&&typeof(this.responses[ri].value2[rk].name) != "undefined"){
              responsesstr +='<resnode name="' +this.responses[ri].value2[rk].name;
            }
            if(this.responses[ri].value2[rk].type!=""&&typeof(this.responses[ri].value2[rk].type) != "undefined"){
              responsesstr +='" type="' +this.responses[ri].value2[rk].type;
            }
            if(this.responses[ri].value2[rk].style&&typeof(this.responses[ri].value2[rk].style) != "undefined"){
              responsesstr +='" style="' +this.responses[ri].value2[rk].style;
            }
            if(this.responses[ri].value2[rk].ref&&typeof(this.responses[ri].value2[rk].ref) != "undefined"){
              responsesstr +='" ref="' +this.responses[ri].value2[rk].ref;
            }
            if(this.responses[ri].value2[rk].value&&typeof(this.responses[ri].value2[rk].value) != "undefined"){
              responsesstr +='" value="' +this.responses[ri].value2[rk].value;
            }
            responsesstr +='"></resnode>';
          }
          responsesstr = responsesstr + '</reply>';
        }


        responsesstr = responsesstr + '</response>';        
      }
      responsesstr =responsesstr +"</responses>";
      //命令配置
      var commandsstr ="<commands>"
      for (var ci = 0; ci < this.commands.length; ci++) { 
        commandsstr = commandsstr + '<command name="'+this.commands[ci].name+'">';
        for (var cj = 0; cj < this.commands[ci].value.length; cj++){
          // console.log(chlength+"/"+j)
          commandsstr =commandsstr +'<cmdnode name="' +this.commands[ci].value[cj].name +'" type="' +this.commands[ci].value[cj].type + '" value="' +this.commands[ci].value[cj].value +'"></cmdnode>';
        }
        commandsstr = commandsstr + '</command>';        
      }
      commandsstr =commandsstr +"</commands>";
      //校验码配置
      var checkcodesstr="<checkcodes><checkcode>";
      for(var chki=0;chki<this.checkcodes.length;chki++){
        checkcodesstr += '<chknode name="'+this.checkcodes[chki].name+'" type="'+this.checkcodes[chki].type;
        if(this.checkcodes[chki].value!=""&&typeof(this.checkcodes[chki].value) != "undefined"){
          checkcodesstr +='" value="'+this.checkcodes[chki].value;
        }
        checkcodesstr +='"></chknode>'
      }
      checkcodesstr = checkcodesstr +"</checkcode></checkcodes>";
      // console.log("infos:",infostr);
      // console.log("responses:",responsesstr);
      // console.log("commands:",commandsstr);
      // console.log("checkcodes",checkcodesstr);
      // console.log(head+infostr+responsesstr+commandsstr+checkcodesstr+foot);
      this.href = "data:text/plain,"+head+infostr+responsesstr+commandsstr+checkcodesstr +foot;
      console.log(this.href);
    },
    // 读取excel文件
    ReadExcel:function($event){     
      var wb;//读取完成的数据
      var rABS = false; 
      var file =$event.target.files[0]; 
      var reader = new FileReader();
      
      var that=this;

      reader.onload = function(e) {
          var data = e.target.result;
          if(rABS) {
              wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                  type: 'base64'
              });
          } else {
              wb = xlsx.read(data, {
                  type: 'binary'
              });
          }
          //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
          //wb.Sheets[Sheet名]获取第一个Sheet的数据
          // JSON.parse(String)
          // that.channels=JSON.stringify( xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
          that.channels= xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) ;
      };
      if(rABS) {
          reader.readAsArrayBuffer(file);
      } else {
          reader.readAsBinaryString(file);
          // setTimeout(function(){console.log('3',that.channels)},2000)
      }
    },
    //生成校验码
    getcheckcode:function(param){
      if(param.value.length<=0){
        alert("请先输入数据")
        return;
      }
      switch(this.deviceinfo.checkcodetype){
        case "ascii":
        var checkcodearray=[];
        var checkcode=0;
        for (var i = param.start; i <= param.end; i++) {
          checkcodearray =checkcodearray.concat(this.bytestr2Bytes(param.value[i].value) );
        }
        for (var j = 0; j < checkcodearray.length; j++) {
          checkcode+=checkcodearray[j];
        }
        checkcode=~(checkcode%65536) + 1;
        checkcode=checkcode&0xFFFF;
        //323030344430343130303030 ==>FDA1
        checkcode.toString(16).toUpperCase();

        var p={}; 
        p.name="checknum";
        p.type="byte";
        p.value=checkcode.toString(16).toUpperCase();

        param.value.push(p);
        break;
        default :
        console.log("default");
        break;
      }
    },
    //按字符转
    str2Bytes:function(str) {  
      var ch, st, re = [];  
      for (var i = 0; i < str.length; i++ ) {  
        ch = str.charCodeAt(i);  // get char   
        st = [];                 // set up "stack"  
        do {  
          st.push( ch & 0xFF );  // push byte to stack  
          ch = ch >> 8;          // shift value down by 1 byte  
        }    
        while ( ch );  
        // add stack contents to result  
        // done because chars have "wrong" endianness  
        re = re.concat( st.reverse() );  
      }  
      // return an array of bytes  
      return re;  
    },
    //按字节转
    bytestr2Bytes:function Str2Bytes(str){
      var pos = 0;
      var len = str.length;
      if(len %2 != 0)
      {
         return null; 
      }
      len /= 2;
      var hexA = [];
      for(var i=0; i<len; i++)
      {
         var s = str.substr(pos, 2);
         var v = parseInt(s, 16);
         hexA.push(v);
         pos += 2;
      }
      return hexA;
    } 

  }
}
</script>

<style>
*{
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  line-height: 1.42857143;
  color: #999999;
  box-sizing: border-box;
}
.pannel{
  background: #FFF;
  border: 5px solid #e5e5e5;
  border-radius: 0 !important;
  box-shadow: none !important;
  margin-bottom: 20px;
}
.head{
  color: #FFFFFF;
  background: #0a819c;
  border-color: #0a819c !important;
  font-size: 18px;
  padding: 7px 15px;
  border-top-right-radius: 0 !important;
  border-top-left-radius: 0 !important;
}
.body{
  padding: 15px;
}

.table{
  border: 1px solid #ddd;
  width: 100%;
  margin-bottom: 10px;
  border-collapse: collapse;
  border-spacing: 0;
  max-width: 100%;
  background-color: transparent;
}
.table > thead > tr > th{
  border: 1px solid #ddd;
  padding:4px;
  vertical-align: bottom;

}
/* */
.table tbody tr td {
  border: 1px solid #ddd;
  padding:4px;
  vertical-align: bottom;
}
.text {
  border: 0px;
  width: 100%;
  height: 100%;
}
.chkinput{
  width:40px;
}
.foot{
  height: 100%;
  /*width: 40px;*/
  padding: 10px 12px ;
}
.a{
  text-decoration:none;
  padding: 8px;
  font-size: 8px;
  color: #FFF;
  background-color: #5bc0de;
}
.select{
    box-shadow: none !important;
    border-color: #e5e5e5;
    display: block;
    width: 100%;
    /*height: 34px;*/
    padding: 2px 3px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
}
.right{
  float: right;
}
</style>
