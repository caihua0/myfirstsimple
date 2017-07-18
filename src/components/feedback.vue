<template>
	<div class="container" name="login">
		<h1></h1>
		<h2>{{msg}}</h2>
		<div class="form" >
			您的姓名<input type="text" name="name" placeholder="">
			您的联系方式<input type="test" name="phone" placeholder="">
			QQ或邮箱<input type="text" name="info" placeholder="">
			您的母校&班级<input type="text" name="school" placeholder="">
			您的毕业年份，大家共度的在校时间<input type="text" name="graduation" placeholder="">
			预计加入人数<input type="text" name="count" placeholder="">
			是否有意向地点，出行计划<input type="text" name="memo" placeholder="">
			<button type="button" class="login">提交</button>
		</div>
	</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to home'
    }
  }
}
</script>

<style>


</style>
