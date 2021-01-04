<template>
  <div>
    <table>
      <tr>
        <td>id</td>
        <td>用户名</td>
        <td>性别</td>
      </tr>
      <tr v-for="item in user">
        <td>{{item.id}}</td>
        <td>{{item.username}}</td>
        <td>{{item.sex}}</td>
      </tr>
    </table>
    {{msg}}
  </div>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "User",
      data(){
          return{
            msg:'hello vue',
            user: [
              {
                id: 1,
                username: "xiaoming",
                sex: 1
              },
              {
                id: 2,
                username: "xiaohua",
                sex: 1
              },
              {
                id: 3,
                username: "xiaohong",
                sex: 0
              }
            ]
          }
      },
      created(){
          const _this = this
          axios.get('http://localhost:8181/api/user/list').then(function (resp) {
            console.log(resp)
            _this.user = resp.data
          })
      }
    }
</script>

<style scoped>

</style>
