<template>
  <section>
    <div style="display: flex">
      <div class="echart_iter">
        <v-chart autoresize :option="iter_opiter" @click="show_member"/>
      </div>
      <div class="echart_iter_member">
        <v-chart autoresize :option="iter_m_ball"/>
      </div>
    </div>
    <div class="echart_member">
      <v-chart autoresize :option="member_opiter"/>
    </div>
  </section>
</template>

<script>
import {getListAPI} from "../utils/api/apis";

export default {
  name: "myEchart",
  data() {
    return {
      iter_m_ball: {},
      iter_opiter: {},
      iter_name_list: [],
      iter_id_list: [],
      member_opiter: {},
      name: ''
    };
  },
  methods: {
    //设置迭代详情数据
    set_Mball_option(x_data, iter_name) {
      this.iter_m_ball = {
        title: {
          text: iter_name,
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}个 ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: x_data.map(item => {
            return item.name;
          })
        },
        series: [
          {
            name: iter_name,
            type: "pie",
            data: x_data,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b} : {c}'
                }
              }
            }
          },
        ],
      };
    },
    //设置迭代数据
    set_iter_opiter() {
      let iter_num = [];
      this.$axios.get('/iters').then((response) => {
        console.log(response);
        response.data.map(item => {
          this.iter_name_list.push(item.name);
          this.iter_id_list.push(item.iter_id);
          iter_num.push(item.number);
        })
        this.iter_opiter = {
          title: {
            text: "迭代鱼丸统计"
          },
          //工具提示，鼠标移上去
          tooltip: {},
          //图例说明
          legend: {
            data: '点击显示详情'
          },
          xAxis: {
            type: "category",
            data: this.iter_name_list
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: iter_num,
              type: "bar",
              smooth: true,
            },
            {
              data: iter_num,
              type: 'line',
              smooth: true,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: '{c}'
                  }
                }
              }
            }
          ]
        };
        this.$axios.get('/iter_member?iter_id=' + this.iter_id_list[0]).then((response) => {
          let m_ball = [];
          response.data.map(item => {
            m_ball.push({name: item.member_name, value: item.number});
          })
          console.log('mi', m_ball);
          this.set_Mball_option(m_ball, this.iter_name_list[0]);
        })
      })
    },
    //点击迭代显示详情图标
    show_member(data) {
      let iter_name = data.name;
      let iter_id = this.iter_id_list[this.iter_name_list.indexOf(iter_name)];
      this.$axios.get('/iter_member?iter_id=' + iter_id).then((response) => {
        let m_ball = [];
        response.data.map(item => {
          m_ball.push({name: item.member_name, value: item.number});
        })
        console.log('mi', m_ball);
        this.set_Mball_option(m_ball, iter_name);
      })
    },
    set_member_opiter() {
      this.$axios.get('/member').then((response) => {
        let m_name = [];
        let m_num = [];
        response.data.map(item => {
          m_name.push(item.name);
          m_num.push(item.number);
        })
        this.member_opiter = {
          title: {
            text: "成员鱼丸统计"
          },
          //工具提示，鼠标移上去
          tooltip: {},
          //图例说明
          legend: {
            data: '点击显示详情'
          },
          xAxis: {
            type: "category",
            data: m_name
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: m_num,
              type: "bar",
              smooth: true
            },
            {
              data: m_num,
              type: 'line',
              smooth: true,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: '{c}'
                  }
                }
              }
            }
          ]
        }
      })
    }
  },
  mounted() {
    this.set_iter_opiter();
    // this.set_Mball_option();
    this.set_member_opiter();
  }
}
</script>

<style scoped>

.echart_iter {
  width: 70%;
  height: 400px;
  flex: 1 0 70%;
}

.echart_iter_member {
  width: 30%;
  height: 400px;
}

.echart_member {
  width: auto;
  height: 400px;
}
</style>
