<template>
  <div class="grid">
    <div class="title">数据面板</div>
    <div class="chart" ref="chart"></div>
    <div class="grid-list">
      <div class="grid-list-item">
        <p>100,000,000</p>
        <span>初始发行量</span>
      </div>
      <div class="grid-list-item">
        <p>93,814,048</p>
        <span>流通代币</span>
      </div>
      <div class="grid-list-item">
        <p>6,185,952</p>
        <span>已销毁代币</span>
      </div>
      <div class="grid-list-item">
        <p>205</p>
        <span>持币地址数</span>
      </div>
      <div class="grid-list-item">
        <p>15%</p>
        <span>当前燃烧率</span>
      </div>
      <div class="grid-list-item">
        <p>8,520,863IBT</p>
        <span>分红池</span>
      </div>
      <div class="grid-list-item">
        <p>158</p>
        <span>可分红地址数</span>
      </div>
      <div class="grid-list-item">
        <p>53,929.51</p>
        <span>每个地址预计分红</span>
      </div>
      <div class="grid-list-item">
        <p>685,582</p>
        <span>大奖池</span>
      </div>
      <div class="grid-list-item">
        <p>2</p>
        <span>发奖次数</span>
      </div>
    </div>
    <div class="fomo_title">
      <span class="title_address">FOMO奖励名单</span>
      <span class="title_coin">FOMO奖励代币</span>
    </div>
    <transition-group name="insert" tag="ul" class="fomo_list">
      <li
        v-for="(i, key) in this.fomoList"
        :key="i.address"
        v-bind:style="{ animationDelay: `${key + 0.2}s` }"
      >
        <span class="winer_address">{{ i.address }}</span>
        <span class="winer_money">{{ i.value }}</span>
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
      investContract: "TKzEDGrsGPzt86d4Cv6pmZDe9CsA6NfkZC",
      contract: "",
      tronweb: "",
      address: "",
      precision: 6,
      total: 100000000,
      totalSupply: 0,
      otherToken: 100000000,
      burnRate: "-- %",
      transferRewardPoolAmount: "-",
      dividePoolAmount: "-",
      tokenHolderCount: "-",
      transferRewardAmountLimit: "-",
      divideRewardAmountLimit: "-",
      divideReward: "-",
      divideUserCount: "-",
      divideCount: "-",
      transactions: {},
      fomoList: []
    };
  },
  mounted() {
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
    this.myChart = this.$echarts.init(this.$refs.chart);
    this.myChart.setOption(option);
  },
  methods: {
    init() {
      this.getDividePoolAmount();
      this.getTransferRewardPoolAmount();
      this.getBurnRate();
      this.getTotalSupply();
      this.getCurrentBlock();
      this.getFomoAddress();
    },
    async login() {
      // 实例化合约
      await this.tronweb.setAddress("TNrXTDu4pX24G18PBdn3jfrtVeb4jrkCTY");
      console.log(this.tronweb.isAddress("TNrXTDu4pX24G18PBdn3jfrtVeb4jrkCTY"));
      try {
        this.contract = await this.tronweb.contract().at(this.investContract);
        console.log(this.contract);
      } catch (e) {
        console.log(e);
      }
      this.init();
      setInterval(() => {
        this.init();
      }, 10000);
      // }
    },
    // 分红池金额
    async getDividePoolAmount() {
      this.dividePoolAmount = (
        (await this.contract.DividePoolAmount().call()) /
        Math.pow(10, this.precision)
      ).toFixed(2);
    },
    // 交易奖池金额
    async getTransferRewardPoolAmount() {
      this.transferRewardPoolAmount = (
        (await this.contract.TransferRewardPoolAmount().call()) /
        Math.pow(10, this.precision)
      ).toFixed(2);
    },
    // 当前燃烧率
    async getBurnRate() {
      this.burnRate = (await this.contract.getBurnRate().call()) + "%";
      console.log(this.burnRate);
    },
    // 代币流通量
    async getTotalSupply() {
      this.totalSupply =
        (await this.contract.totalSupply().call()) /
        Math.pow(10, this.precision);
      this.otherToken = (this.total - this.totalSupply).toFixed(3);

      this.myChart.setOption({
        series: [
          {
            name: "token",
            data: [
              {
                value: this.totalSupply,
                name: "流通代币",
                itemStyle: { color: "#0EC8FF" }
              },
              {
                value: this.total - this.totalSupply,
                name: "已销毁代币",
                itemStyle: { color: "#E500FF" }
              }
            ]
          }
        ]
      });
    },
    //获取最新交易信息
    async getCurrentBlock() {
      let currentBlock = await this.tronweb.trx.getCurrentBlock();
      this.transactions = currentBlock.transactions;
      console.log(this.transactions);
    },
    //获取中奖地址
    async getFomoAddress() {
      axios.get("/api/fomoList").then(res => {
        this.fomoList = res.data.list;
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
  color: #0085db;
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-bottom: 5px;
  padding: 20px 0;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(black, 0.2);
  animation: enlist 5s linear infinite;
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
