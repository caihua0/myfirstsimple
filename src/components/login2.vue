<template>
	<div class="container" name="login">
		<h1>欢迎登陆</h1>
		<h2>{{msg}}</h2>
		<div class="form" >
			<input type="text" name="username" placeholder="用户名">
			<input type="password" name="password" placeholder="密码">
			<button type="button" class="login">login</button>
		</div>
	</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to login'
    }
  }
}
</script>

<style>
/*@import url(http://fonts.useso.com/css?family=Source+Sans+Pro:200,300);*/

.container{
	text-align: center;
	background-color: #53e3a6;
	/*background: #50a3a2;*/
	/*opacity: 0.8;*/
	color: white;
}
h1, h2 {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	font-weight: normal;
	/*color: #2c3e50;*/
  	margin-top: 60px;
}
.form{
	border: 1px solid #000;
	position: relative;
}
input{
	outline: 0;
	text-align: center;
	border-radius: 3px;
	width: 250px;
	font-size: 18px;
	margin: 0 auto 10px auto;
	padding: 10px 15px;
	color:white;
	text-shadow: none;
	border:1px solid rgba(255,255,255,0.4);
	background-color: rgba(255,255,255,0.2);
	display: block;
}
input:focus{
	width: 300px;
	background-color: #ffffff;
	color:#53e3a6;
}


</style>
