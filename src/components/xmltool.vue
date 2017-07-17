<template>
<div>

  
  <!-- 头部信息 -->
  <div id="head">

    <!-- infos： {{deviceinfo}}<br/> -->
    <!-- responses： {{responses}}<br/> -->
    <!-- commands： {{commands}}<br/> -->

    类型(delimiter):<input type="text" name="type" v-model="deviceinfo.type">
    分隔符:<input type="text" name="value" v-model="deviceinfo.value">
    命令起始位置<input type="text" name="commandindex" v-model="deviceinfo.commandindex">
    命令长度<input type="text" name="length" v-model="deviceinfo.length">
    头部字节<input type="text" name="head" v-model="deviceinfo.head">
    <input type="file" @change="ReadExcel">
    <input type="button" @click="ExportExcel" value="导入">
    <!-- <input type="button" @click="ExportXml" value="生成"> -->
    <a v-bind:href="href" download="xml.txt" @click="ExportXml">下载</a>
    <!-- <vue-xlsx-table @on-click-ok="handleOk"></vue-xlsx-table> -->
    <!-- <input type="file" v-model="filePath"/> -->
  </div>
  <!-- <div>{{channels}}</div> -->
  <!-- <button v-on:click="result">log</button> -->

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
      校验码类型:
      <select v-model="command.chk">
       <option selected value="ascii">ascii</option>
       <option value="banana">香蕉</option>
       <option value="watermelon">西瓜</option>
      </select>
      <input type="text" name="start" v-model="command.start">-<input type="text" name="end" v-model="command.end"><button @click="getcheckcode(command)">生成校验码</button>

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
      commands:[{name:"CurrentData",value:[],start:0,end:0,chk:"ascii"},{name:"ControlData",value:[],start:0,end:0,chk:"ascii"}],
      deviceinfo:{type:"",value:"",commandindex:"",length:"",head:""},
      checkcodes:[],
      channels:[],
      href:""

    }
  },
  methods:{
    addresponsenode:function(i){
      var response ={name:"",type:"",size:""};
      this.responses[i].value.push(response);
    },
    delresponsenode:function(i,index){
      this.responses[i].value.splice(index,1);
    },
    addcommandnode:function(i){
      var command ={name:"",type:"",value:""};
      this.commands[i].value.push(command);
    },
    delcommandnode:function(i,index){
      this.commands[i].value.splice(index,1);
    },
    addcheckcodenode:function(){
      var checkcode ={name:"",type:"",value:""};
      this.checkcodes.push(checkcode);
    },
    delcheckcodenode:function(index){
      this.checkcodes.splice(index,1);
    },
    addbefore:function(param,index){
        param.splice(index,0,{});
        
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
      var infostr='<infos type="' +this.deviceinfo.type+ '" value="' +this.deviceinfo.value +'" commandindex="' +this.deviceinfo.commandindex+ '" length="' +this.deviceinfo.length +'" head="' +this.deviceinfo.head+ '"></infos>';
      var reslength = this.responses.length;
      var chlength =this.channels.length;
      var responsesstr ="<responses>"; 
      for (var ri = 0; ri <  this.responses.length; ri++) {  
        responsesstr = responsesstr + '<response name="'+this.responses[ri].name+'">';
        for (var rj = 0; rj <  this.responses[ri].value.length; rj++){
          responsesstr =responsesstr +'<resnode name="' +this.responses[ri].value[rj].name +'" type="' +this.responses[ri].value[rj].type + '" size="' +this.responses[ri].value[rj].size +'"></resnode>';
        }
        responsesstr = responsesstr + '</response>';        
      }
      responsesstr =responsesstr +"</responses>";
      var commandsstr ="<commands>"
      for (var ci = 0; ci < this.commands.length; ci++) { 
        commandsstr = commandsstr + '<command name="'+this.commands[ci].name+'">';
        for (var cj = 0; cj < this.commands[ci].value.length; cj++){
          // console.log(chlength+"/"+j)
          commandsstr =commandsstr +'<cmdnode name = "' +this.commands[ci].value[cj].name +'" type="' +this.commands[ci].value[cj].type + '" value="' +this.commands[ci].value[cj].value +'"></cmdnode>';
        }
        commandsstr = commandsstr + '</command>';        
      }
      commandsstr =commandsstr +"</commands>";

      var checkcodesstr="<checkcodes><checkcode>";
      for(var chki=0;chki<this.checkcodes.length;chki++){
        checkcodesstr = checkcodesstr + '<chknode name="'+this.checkcodes[chki].name+'" type="'+this.checkcodes[chki].name+'" value="'+this.checkcodes[chki].value+'"></chknode>';
      }
      checkcodesstr = checkcodesstr +"</checkcode></checkcodes>";
      console.log("infos:",infostr);
      console.log("responses:",responsesstr);
      console.log("commands:",commandsstr);
      console.log("checkcodes",checkcodesstr);
      console.log(infostr+responsesstr+commandsstr+checkcodesstr);
      // this.href ="data:application/octet-stream;base64," + infostr;
      this.href = "data:text/plain," +infostr+responsesstr+commandsstr+checkcodesstr;
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
      // console.log(param.start,param.end);
      switch(param.chk){
        case "ascii":
        var checkcode=0;
        for (var i = param.start; i <= param.end; i++) {
          console.log(param.value[i].value);
          var num =~parseInt(param.value[i].value,16);
          console.log(num);
          // String.fromCharCode(param.value[i]);
          // checkcode = checkcode +   "7E".charCodeAt();
          console.log(checkcode);
        }
        break;
        default :
        console.log("default");
        break;
      }
    },
    stringToBytes:function(str) {  
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
  }  

  }
}
</script>

<style>

</style>
