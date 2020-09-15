<template>
  <div class="grid">
    <div class="title">{{ this.i18n === "cn" ? "数据面板" : "Data" }}</div>
    <div class="chart" ref="chart"></div>
    <div class="grid-list">
      <div class="grid-list-item">
        <p>{{ totalSupply }}</p>
        <span>{{ this.i18n === "cn" ? "流通代币" : "Destroyed" }}</span>
      </div>
      <div class="grid-list-item">
        <p>{{ otherToken }}</p>
        <span>{{ this.i18n === "cn" ? "已销毁代币" : "Data" }}</span>
      </div>
      <div class="grid-list-item">
        <p>{{ tokenHolderCount }}</p>
        <span>{{ this.i18n === "cn" ? "持币地址数" : "Total Address" }}</span>
      </div>
      <div class="grid-list-item">
        <p>{{ burnRate }}</p>
        <span>{{ this.i18n === "cn" ? "当前燃烧率" : "Burn Rate" }}</span>
      </div>
      <div class="grid-list-item">
        <p>{{ dividePoolAmount }}</p>
        <span>{{ this.i18n === "cn" ? "分红池" : "Dividend Pool" }}</span>
      </div>
      <div class="grid-list-item">
         <p>{{divideCount}}</p>
        <span>{{ this.i18n === "cn" ? "可分红地址数" : "Dividend Addresses" }}</span>
      </div>
      <div class="grid-list-item">
         <p>{{ ( dividePoolAmount / divideCount ).toFixed(2) }}</p>
        <span>{{ this.i18n === "cn" ? "每个地址预计分红" : "Dividend for each address" }}</span>
      </div>
      <div class="grid-list-item">
        <p>{{ transferRewardPoolAmount }}</p>
        <span>{{ this.i18n === "cn" ? "大奖池" : "Prize Pool" }}</span>
      </div>
      <div class="grid-list-item">
        <p>50000IBT</p>
        <span>{{
          this.i18n === "cn" ? "参与最低代币限制" : "Minimum IBT quantity limit"
        }}</span>
      </div>
      <div class="grid-list-item">
        <p>{{ this.fomoTimer }}{{this.i18n === "cn"?"秒":"S"}}</p>
        <span>{{
          this.i18n === "cn" ? "FOMO发奖倒计时" : "Minimum IBT quantity limit"
        }}</span>
      </div>
    </div>
    <div class="fomo_title">
      <span class="title_address">{{this.i18n === "cn" ?"FOMO奖励名单":"FOMO Reward Address"}}</span>
      <span class="title_coin">{{this.i18n === "cn" ?"FOMO奖励代币":"FOMO Reward Preview"}}</span>
    </div>
    <transition-group name="insert" tag="ul" class="fomo_list">
      <li v-for="(i, key) in this.fomoList" :key="key">
        <span class="winer_address">{{ i.address }}</span>
        <span class="winer_money">{{ i.amount }}</span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import TronWeb from "tronweb";
import axios from "axios";
export default {
  name: "grid",
  data() {
    return {
      investContract: "TWSuK6c6h9NrnXZEHLrnu8DHaDv1kNFgf6",
      contract: "",
      tronweb: "",
      address: "",
      precision: 8,
      total: 100000000,
      totalSupply: 0,
      otherToken: 100000000,
      burnRate: "15 %",
      transferRewardPoolAmount: "-",
      dividePoolAmount: "-",
      tokenHolderCount: "-",
      transferRewardAmountLimit: "-",
      divideRewardAmountLimit: "-",
      divideReward: "-",
      divideUserCount: 0,
      divideCount: 0,
      transactions: {},
      fomoList: [],
      fomoTimer: 480
    };
  },
  props: ["i18n"],
  mounted() {
    setInterval(() => {
      this.fomoTimer = this.fomoTimer - 1;
      if(this.fomoTimer < 1){
        this.fomoTimer = 480;
      }
    }, 1000);
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.trongrid.io");
    const solidityNode = new HttpProvider("https://api.trongrid.io");
    const eventServer = new HttpProvider("https://api.trongrid.io");
    const privateKey =
      "7BDDF60649347F1CAD2D07748392CE7A3FC378598893A56EEA8E36EFBA4535E0";
    const tronWeb = new TronWeb(
      fullNode,
      solidityNode,
      eventServer,
      privateKey
    );
    window.tempTronWeb = tronWeb;
    this.tronweb = tronWeb;
    this.login();
    let option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        show: false
      },
      series: [
        {
          name: "token",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center"
          },
          labelLine: {
            show: false
          },
          data: []
        }
      ]
    };
    if (document.body.offsetWidth > 745) {
      option.series[0].center = [300, 168];
    }
    // 初始化
    // this.myChart = this.$echarts.init(this.$refs.chart);
    // this.myChart.setOption(option);
  },
  methods: {
    init() {
      this.getDividePoolAmount();
      this.getHolderPoolNumber();
      this.getTransferRewardPoolAmount();
      // this.getBurnRate();
      this.getDividePoolNumber();
      this.getTotalSupply();
      this.getFomoAddress();
    },
    async login() {
      // 实例化合约
      try {
        this.contract = await this.tronweb.contract().at(this.investContract);
        await this.tronweb.setAddress("TWSuK6c6h9NrnXZEHLrnu8DHaDv1kNFgf6");
      } catch (e) {
        console.log(e);
      }
      this.init();
      setInterval(() => {
        this.init();
      }, 300000);
    },
    //分红仓数
    getDividePoolNumber() {
      let _this = this, index = 1;
      get(index);
      function get(i) {
        let start = (i - 1) * 40 ,limit = 40;
        i++;
        axios
            .get(`https://apilist.tronscan.org/api/token_trc20/holders?sort=-balance&start=${start}&limit=${limit}&contract_address=TWSuK6c6h9NrnXZEHLrnu8DHaDv1kNFgf6`)
            .then((response) => {
              let list = response.data.trc20_tokens;
              list.forEach(item => {
                if(item.balance / Math.pow(10, _this.precision).toFixed(2) > 100000) {
                  _this.divideCount ++ ;
                }

              });
              if (list.length == 40) {
                get(i)
              }
            })
            .catch(function(error) {
              console.log(error);
            });
      }
    },
    // 持仓数
    getHolderPoolNumber() {
      axios
        .get(
          "https://apilist.tronscan.org/api/token_trc20/holders?sort=-balance&start=0&limit=20&contract_address=TWSuK6c6h9NrnXZEHLrnu8DHaDv1kNFgf6"
        )
        .then(response => {
          this.tokenHolderCount = response.data.total;
          return response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 分红池金额
    async getDividePoolAmount() {
      axios
        .get(
            "https://apilist.tronscan.org/api/account?address=TLB6vvcENg5SBiHw9zQBpVrwTcYCFG5R3G"
        )
        .then(response => {
          this.dividePoolAmount = ((response.data.trc20token_balances[0].balance) /  Math.pow(10, this.precision)).toFixed(2);
          return response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      // this.dividePoolAmount = (
      //   (await this.contract.DividePoolAmount().call()) /
      //   Math.pow(10, this.precision)
      // ).toFixed(2);
    },
    // 交易奖池金额
    async getTransferRewardPoolAmount() {
      axios
        .get(
              "https://apilist.tronscan.org/api/account?address=TEt3SuPdjhSpo9U2DUbSSuWaQNMiQjzrw3"
          )
            .then(response => {
              this.transferRewardPoolAmount = ((response.data.trc20token_balances[0].balance) /  Math.pow(10, this.precision)).toFixed(2);
              return response.data;
            })
            .catch(function(error) {
              console.log(error);
            });
      // this.dividePoolAmount =
      //     ((await this.contract.DividePoolAmount().call()) /
      //         Math.pow(10, this.precision)).toFixed(2);
    },
    // 当前燃烧率
    async getBurnRate() {
      this.burnRate = (await this.contract.getBurnRate().call()) + "%";
      console.log(this.burnRate);
    },
    // 代币流通量
    async getTotalSupply() {
      this.totalSupply =
          ((await this.contract.totalSupply().call()) /
        Math.pow(10, this.precision)).toFixed(2);
      this.otherToken = (this.total - this.totalSupply).toFixed(2);
    },
    //获取fomo倒计时
    async getFomoCountDown() {
      axios.get("/api/ibtFomoCountDown ").then(res => {
        this.fomoTimer = res.data.countdown;
      });
    },
    //获取中奖地址
    async getFomoAddress() {
      axios.get("/api/fomoList").then(res => {
        this.fomoList = res.data;
      });
    }
  }
};
</script>

<style scoped lang="less">
.grid {
  padding: 0 20px;
  padding-top: 100px;
  padding-bottom: 80px;
  max-width: 1200px;
  margin: auto;
}
.grid .title {
  font-size: 42px;
  font-weight: 500;
  position: relative;
  margin-bottom: 58px;
  text-align: center;
  margin-bottom: 75px;
}
.grid .title::after {
  content: "";
  display: block;
  position: absolute;
  width: 94px;
  height: 6px;
  border-radius: 3px;
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    from(#0085db),
    to(#00d1cd)
  );
  background: linear-gradient(to bottom right, #0085db 0%, #00d1cd 100%);
  bottom: -23px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  -ms-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
.grid .grid-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  -moz-column-gap: 20px;
  column-gap: 20px;
  row-gap: 15px;
}
.grid .grid-list-item {
  padding-top: 32px;
  height: 156px;
  box-shadow: 0 0 3rem -1rem rgba(0, 0, 0, 0.5);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.grid .grid-list-item:hover {
  box-shadow: 0 0.5em 3rem -1rem rgba(0, 0, 0, 0.5);
}
.grid-list-item p {
  font-size: 26px;
  margin-left: 20px;
}
.grid-list-item span {
  display: inline-block;
  font-size: 16px;
  text-align: center;
  color: #1a98a8;
  margin-left: 20px;
}
@media screen and (max-width: 600px) {
  .grid .grid-list {
    grid-template-columns: repeat(2, 1fr);
    -webkit-column-gap: 15px;
    column-gap: 15px;
    row-gap: 20px;
  }
  .grid-list-item p {
    font-size: 26px;
    margin-left: 15px;
  }
  .grid-list-item span {
    display: inline-block;
    font-size: 16px;
    text-align: center;
    color: #0085db;
    margin-left: 15px;
  }
  .fomo_list .winer_address {
    font-size: 0.18rem;
  }
}
.fomo_title,
.fomo_list {
  position: relative;
  margin: 0;
  padding: 0;
  list-style-type: none;
  padding: 0 20px;
  padding-top: 100px;
  padding-bottom: 80px;
  max-width: 1200px;
  margin: auto;
}
.fomo_list {
  padding-left: 0;
  padding-right: 0;
  padding-top: 20px;
}
.fomo_title {
  background: #1a98a8;
  color: #fff;
  padding: 20px;
  margin-top: 80px;
  border-radius: 5px;
}
.fomo_title .title_address,
.winer_address {
  width: 70%;
  text-align: center;
  display: inline-block;
}
.fomo_title .title_coin,
.winer_money {
  width: 30%;
  text-align: center;
  display: inline-block;
}
.fomo_list li {
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 100%;
  margin-bottom: 5px;
  padding: 20px 0;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(black, 0.2);
  // animation: enlist 20s linear infinite;
  border-top: 0;
}
@keyframes enlist {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  25% {
    transform: translateY(5em);
    opacity: 1;
  }
  50% {
    transform: translateY(10em);
  }
  75% {
    transform: translateY(15em);
    opacity: 1;
  }
  100% {
    transform: translateY(20em);
    opacity: 0;
  }
}
</style>
