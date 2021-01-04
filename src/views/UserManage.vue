<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column label="用户id" align="center">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">{{scope.row.username}}</template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">{{scope.row.sex | sexStatus}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      page-size="1"
      :total="totalPages"
      @current-change="page">
    </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    methods: {
      del(row){
        const _this = this
        axios.put('http://localhost:8181/api/user/delete/'+row.id).then(function (resp) {
          if(resp.status === 200) {
            _this.$alert('<' + row.username + '> 删除成功', '消息', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.reload()
              }
            });
          }
        })
      },
      edit(row) {
        this.$router.push({
          path: '/UserUpdate',
          query:{
            id:row.id
          }
        })
      },
      page(pageNumber){
        const _this = this
        axios.get('http://localhost:8181/api/user/list/' + pageNumber + '/5').then(function (resp) {
          _this.tableData = resp.data.content
          _this.total = resp.data.total
        })
      }
    },
    created() {
      const _this = this
      axios.get('http://localhost:8181/api/user/list/0/5').then(function (resp) {
        _this.tableData = resp.data.content
        _this.total = resp.data.total
        _this.totalPages = resp.data.totalPages
      })
    },
    filters: {
      sexStatus (value) {
        if (value) {
          return '女'
        }
        return '男'
      }
    },
    data() {
      return {
        total: null,
        tableData: null,
        typeOptions: null,
        totalPages: null
      }
    }
  }
</script>
