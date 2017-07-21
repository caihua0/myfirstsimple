<template>
	<div class="container" name="login">
		<div class="pannel">

			<div class="head">{{msg}}</div>
			<div class="body" >
				<!-- 您的姓名 -->
				<div class="group">
					<i class="fa fa-user-o"></i>
					<input type="text" name="name" placeholder="姓名" v-model="feedback.name">
				</div>

				<!-- 您的联系方式 -->
				<div class="group">
					<i class="fa fa-mobile"></i>
					<input type="text" name="phone" placeholder="联系方式" v-model="feedback.phone">
				</div>
				<!-- QQ或邮箱 -->
				<div class="group">
					<i class="fa fa-envelope-o"></i>
					<input type="text" name="info" placeholder="QQ/Email" v-model="feedback.info">
				</div>
				<!-- 您的母校&班级 -->
				<div class="group">
					<i class="fa fa-mortar-board"></i>
					<input type="text" name="school" placeholder="母校" v-model="feedback.school">
				</div>
				<!-- 您的毕业年份，大家共度的在校时间 -->
				<div class="group">
					<i class="fa fa-calendar"></i>
					<input type="text" name="graduation" placeholder="在校时间" v-model="feedback.graduation">
				</div>
				<!-- 预计加入人数 -->
				<div class="group">
					<i class="fa fa-child"></i>
					<input type="text" name="count" placeholder="人数" v-model="feedback.count">
				</div>
				<!-- 是否有意向地点，出行计划 -->
				<div class="group">
					<i class="fa fa-drivers-license-o"></i>
					<textarea rows="5" name="memo" placeholder="意向及建议" v-model="feedback.memo"></textarea>
				</div>
			</div>
			<div class="gbutton">
				<button type="button" class="button" @click="add">提交</button>
				<button type="button" class="button" @click="getlist">列表</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Game',
      feedback:{}
    }
  },
  methods:{
  	add:function(){
  		console.log("add");
  		this.$http.post('http://localhost:8080/gamelib/feedback/add',this.feedback,function(response){
  			if(response.body.error==0){
  				
  			}
  			console.log(response.body);
  		});
  	},  	
  	getlist:function(){
	  // GET /someUrl
	  this.$http.get('http://localhost:8080/gamelib/feedback/list').then(response => {

	    // get body data
	    console.log(response.body);
	    // console.log(response.data);

	  }, response => {
	    // error callback
	  });

  	}
  }
}
</script>

<style>
*{
	box-sizing: border-box;
}
.container{
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

    padding-left: 15px;
    padding-right: 15px;
    line-height: 1.42857143;
/*	text-align: center;*/
}
.pannel{
    border: 5px solid #f2994b;
    border-radius: 0 !important;
    box-shadow: none !important;
    margin-bottom: 20px;
    background-color: #fff;
}
.pannel>.head{
	/*font-family: 'Open Sans', sans-serif;*/

	color: #FFFFFF;
	background: #f2994b;
    border-color: #f2994b !important;
    font-size: 18px;
    padding: 7px 15px;
    border-top-right-radius: 0 !important;
    border-top-left-radius: 0 !important;
    border-bottom: 1px solid transparent;
}
.pannel>.body{
	padding: 20px 20px 10px 20px;
	/*margin-bottom: 15px;*/
}
input{
/*	box-shadow: none !important;
	    margin: 0;*/
	display: block;
    /*color: #999999;*/
	width: 100%;
	height: 34px;
	padding: 6px 12px;
	margin-bottom: 15px;
    font-size: 14px;
    background-color: #fff;
    background-image: none;
	border: 1px solid #e5e5e5;
    /*border-color: ;*/
	/*box-shadow: none !important;*/
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
textarea{
	width: 100%;
	display: block;
	height: auto;
	padding: 6px 12px;
    font-size: 14px;
	border: 1px solid #e5e5e5;
	background-color: #fff;
    background-image: none;
	line-height: 1.42857143;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
input[type="text"]:focus,textarea:focus{
	border-color: #999999;
    box-shadow: none;
    outline: 0 none;
} 
.group{
	position: relative;
}
.group i{
	float: right;	
	position: absolute;
   	right: 8px;
	margin: 10px 2px 4px 10px;
    width: 16px;
    height: 16px;
    font-size: 16px;
    text-align: center;
}
.gbutton{
	padding: 20px;
    background: #fafafa;
    border-bottom-right-radius: 4px !important;
    border-bottom-left-radius: 4px !important;
    text-align: right;
}
.button{
	color: #ffffff;
    border: 1px solid #1f68b1;
    background-color: #428bca;
    padding: 6px 12px;
    font-size: 14px;
    outline: none !important;
}


</style>
