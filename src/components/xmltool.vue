<template>
<div>

  
  <!-- 头部信息 -->
  <div id="head">
    分隔符(delimiter):<input type="text" name="delimiter" v-model="delimiter">
    命令起始位置<input type="text" name="commandindex">
    命令长度<input type="text" name="length">
    头部字节<input type="text" name="head">
    <input type="file" @change="ReadExcel">
    <input type="button" @click="ExportExcel" value="read">
    <!-- <vue-xlsx-table @on-click-ok="handleOk"></vue-xlsx-table> -->
    <!-- <input type="file" v-model="filePath"/> -->
  </div>
  <div>{{channels}}</div>
  <button v-on:click="result">log</button>

  <!-- response信息 -->
  <div id="response" v-for="(response,i) in responses">
    <h4>收到数据{{i+1}}:{{response.name}}</h4>
    <!-- 命令名称<input type="text" name="responsename" v-model="response.name"> -->
    <button v-on:click="addresponsenode(i)">添加</button>

    <div v-for="(resnode,index) in response.value"> 
      <!-- <div>{{resnode}}</div> -->
      序号<input type="text" name="index" v-model="index" readonly="true">
      名称<input type="text" name="name" v-model="resnode.name" >
      类型<input type="text" name="type" v-model="resnode.type" >
      长度(字节数)<input type="text" name="size" v-model="resnode.size" >
      <button @click="delresponsenode(i,index)">删除</button>
      <button @click="addbefore(response.value,index)">插入</button>
    </div>
  </div>
  
  <!-- command信息 -->
  <div id="command" v-for="(command,i) in commands">
      <h4>下发命令{{i+1}}:{{command.name}}</h4>
      <!-- 命令名称<input type="text" name="commandname" v-model="command.name"> -->
      <button v-on:click="addcommandnode(i)">添加</button>
      <div v-for="(commandnode,index) in command.value"> 
        <!-- <div>{{commandnode}}</div> -->
        序号<input type="text" name="index" v-model="index" readonly="true">
        名称<input type="text" name="name" v-model="commandnode.name" >
        类型<input type="text" name="type" v-model="commandnode.type" >
        值<input type="text" name="value" v-model="commandnode.value" >
        <button @click="delcommandnode(i,index)">删除</button>
        <button @click="addbefore(command.value,index)">插入</button>
      </div>
  </div>

  <!-- checkcode信息 -->
  <div id="checkcode">
      <h4>校验码-checkcode</h4>
      <!-- 命令名称<input type="text" name="commandname" v-model="command.name"> -->
      <button v-on:click="addcheckcodenode()">添加</button>
      <div v-for="(checkcode,index) in checkcodes"> 
        <!-- <div>{{commandnode}}</div> -->
        序号<input type="text" name="index" v-model="index" readonly="true">
        名称<input type="text" name="name" v-model="checkcode.name" >
        类型<input type="text" name="type" v-model="checkcode.type" >
        值<input type="text" name="value" v-model="checkcode.value" >
        <button @click="delcheckcodenode(index)">删除</button>
      </div>
  </div>
</div>
</template>

<script>
import xlsx from 'xlsx'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',

      responses:[{name:"CurrentData",value:[]},{name:"ControlData",value:[]},{name:"Heartbeat",value:[]}],
      commands:[{name:"CurrentData",value:[]},{name:"ControlData",value:[]}],

      checkcodes:[],
      channels:[]

    }
  },
  methods:{
    addresponsenode:function(i){
      var response ={name:null,type:null,size:null};
      this.responses[i].value.push(response);
    },
    delresponsenode:function(i,index){
      this.responses[i].value.splice(index,1);
    },
    addcommandnode:function(i){
      var command ={name:null,type:null,value:null};
      this.commands[i].value.push(command);
    },
    delcommandnode:function(i,index){
      this.commands[i].value.splice(index,1);
    },
    addcheckcodenode:function(){
      var checkcode ={name:null,type:null,value:null};
      this.checkcodes.push(checkcode);
    },
    delcheckcodenode:function(index){
      this.checkcodes.splice(index,1);
    },
    addbefore:function(param,index){
        param.splice(index,0,{});
        
    },
    ExportExcel:function(){
      console.log(this.channels.count);
      // var a =JSON.parse(""+this.channels);
      // console.log(a.count);
      for (var i = 0; i < this.channels.length; i++){
        // console.log(this.channels[i]);
      }
    },
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
          that.channels=JSON.stringify( xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
          
      };
      if(rABS) {
          reader.readAsArrayBuffer(file);
      } else {
          reader.readAsBinaryString(file);
          // setTimeout(function(){console.log('3',that.channels)},2000)
      }
    },
    handleOk (convertedData) {
      console.log(convertedData)
    },

    result:function(){
      console.log(this.responses[0].name);
      console.log(this.responses[0].value);
    }

  }
}
</script>

<style>

</style>
