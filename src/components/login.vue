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


</style>
