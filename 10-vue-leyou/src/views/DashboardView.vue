<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-col xs10 md6>
        <v-card>
          <v-card-text class="px2">
            <div ref="sale" style="width: 100%;height:350px"></div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col xs10 md6>
        <v-card >
          <v-card-text class="px2">
            <div ref="pie" style="width: 100%;height:350px"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');

export default {
  data(){
    return {

    }
  },
  mounted(){
    this.$nextTick(() => {
      let sale = echarts.init(this.$refs.sale);

      // 指定图表的配置项和数据
      let option = {
        // color: '',  // 配置表格柱状图的颜色
        title: {
          text: '销售统计'
        },
        tooltip: {},
        legend: {
          data:['销量']
        },
        xAxis: {
          data: ["小龙虾","大闸蟹","田螺","田鸡","鸽子肉","猪大腿"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      sale.setOption(option);

      const pie = echarts.init(this.$refs.pie);

      pie.setOption({
        roseType: 'angle',
        title: {
          text: '访问来源'
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data:[
              {value:235, name:'视频广告'},
              {value:274, name:'联盟广告'},
              {value:310, name:'邮件营销'},
              {value:335, name:'直接访问'},
              {value:400, name:'搜索引擎'}
            ]
          }
        ],
        itemStyle: {
          emphasis: {
            // 阴影的大小
            shadowBlur: 200,
            // 阴影水平方向上的偏移
            shadowOffsetX: 0,
            // 阴影垂直方向上的偏移
            shadowOffsetY: 0,
            // 阴影颜色
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      })
    })
  }
}
</script>
