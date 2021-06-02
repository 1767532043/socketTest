<template>
  <div style="text-align:center">
    <div style="margin-bottom:20px">
      <el-button type="primary" @click="startPre">开始模拟</el-button>
      <el-button type="primary" @click='shutPre'>终止模拟</el-button>
      <el-button type="primary" @click="getData">开始预测</el-button>
    </div>
    <canvas
      ref="cav"
      id="myCanvas"
      width="1500"
      height="676"
      style="border: 1px solid #c3c3c3"
    >
      Your browser does not support the canvas element.
    </canvas>
    <div style="width: 1000px;margin-top:10px;margin:auto">
      <el-table :data="dataList" border stripe>
        <el-table-column prop="id" label="节点数量" align="center">
        </el-table-column>
        <el-table-column prop="name" label="通讯次数" align="center">
        </el-table-column>
        <el-table-column prop="amount1" label="实际存活时间" align="center">
        </el-table-column>
        <el-table-column label="预测存活时间(s)" align="center">
          <template slot-scope="scope">
            <span>{{
              (Number(scope.row.id) * xData) +
              (Number(scope.row.name) * yData ) + aData
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="a"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      xData: 0,
      yData: 0,
      aData: 0,
      timer:''
    };
  },
  methods: {
    getData() {
        // this.$http.get("/result").then((res) => {
        //     this.xData = Number(res.data.param[1][0]);
        //     this.yData = Number(res.data.param[2][0]);
        //     this.aData = Number(res.data.param[0][0]);
        //     this.dataList=[]
        //     res.data.result.forEach(item=>{
        //          this.dataList.push({id:item[0],name:item[1],amount1:item[2]})
        //     })
        // });
         function unique2(array){
            var n = {}, r = [], type;
            for (var i = 0; i < array.length; i++) {
             type = typeof array[i];
            if (!n[array[i]]) {
                n[array[i]] = [type];
                console.log([type])
                r.push(array[i]);
            } else if (n[array[i]].indexOf(type) < 0) {
                n[array[i]].push(type);
                r.push(array[i]);
            }
            }
         console.log(n);
        }
        unique2([1,2,3,5,8,8])
    },
    startPre(){
        this.$http.get("/initialize").then((res) => {
            // let c = document.getElementById("myCanvas");
            let cxt = this.$refs.cav.getContext("2d");
            let dataList = res.data
            for (let i = 0; i < dataList.length; i++) {
                cxt.fillStyle = dataList[i].color;
                cxt.beginPath();
                cxt.arc(dataList[i].coordinateX, dataList[i].coordinateY, 5, 0, Math.PI * 2, true);
                cxt.closePath();
                cxt.fill();
            }
            this.timer = setInterval(()=>{
                this.show()
            },3000)
            
        });
    },
    show(){
        this.$http.get("/show").then((res) => {
            // let c = document.getElementById("myCanvas");
            // let cxt = c.getContext("2d");
            let cxt = this.$refs.cav.getContext("2d");
            let dataList = res.data

            for (let i = 0; i < dataList.length; i++) {
                cxt.fillStyle = dataList[i].color;
                cxt.beginPath();
                cxt.arc(dataList[i].coordinateX, dataList[i].coordinateY, 5, 0, Math.PI * 2, true);
                cxt.closePath();
                cxt.fill();
            }
            setTimeout(()=>{
                this.restore()
            },2000)
        });
    },
    restore(){
        this.$http.get("/restore").then((res) => {
            // let c = document.getElementById("myCanvas");
            // let cxt = c.getContext("2d");
            let cxt = this.$refs.cav.getContext("2d");
            let dataList = res.data

            for (let i = 0; i < dataList.length; i++) {
                cxt.fillStyle = dataList[i].color;
                cxt.beginPath();
                cxt.arc(dataList[i].coordinateX, dataList[i].coordinateY, 5, 0, Math.PI * 2, true);
                cxt.closePath();
                cxt.fill();
            }
        });
    },
    shutPre(){
        clearInterval(this.timer)
    }
  },
};
</script>

<style>
.a{
            width: 0;
            height: 0;
            border-width: 100px;
            border-style: solid;
            border-color: transparent #0099CC transparent transparent;
            transform: rotate(90deg);
 }
</style>