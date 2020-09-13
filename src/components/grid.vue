<template>
  <div class="grid">
    <div class="title">{{ this.i18n === "cn" ? "数据面板" : "Data" }}</div>
    <div class="chart" ref="chart"></div>
    <div class="grid-list">
      <div class="grid-list-item">
        <p>{{ total }}</p>
        <span>{{ this.i18n === "cn" ? "初始发行量" : "Circulation" }}</span>
      </div>
      <div class="grid-list-item">
        <p>{{totalSupply}}</p>
        <span>{{ this.i18n === "cn" ? "流通代币" : "Destroyed" }}</span>
      </div>
      <div class="grid-list-item">
        <p>{{ otherToken }}</p>
        <span>{{ this.i18n === "cn" ? "已销毁代币" : "Data" }}</span>
      </div>
      <div class="grid-list-item">
         <p>205</p>
        <span>{{ this.i18n === "cn" ? "持币地址数" : "Total Address" }}</span>
      </div>
      <div class="grid-list-item">
         <p>{{ burnRate }}</p>
        <span>{{ this.i18n === "cn" ? "当前燃烧率" : "Burn Rate" }}</span>
      </div>
      <div class="grid-list-item">
         <p>{{ dividePoolAmount }}IBT</p>
        <span>{{ this.i18n === "cn" ? "分红池" : "Dividend Pool" }}</span>
      </div>
      <div class="grid-list-item">
         <p>158</p>
        <span>{{ this.i18n === "cn" ? "可分红地址数" : "Dividend Addresses" }}</span>
      </div>
      <div class="grid-list-item">
         <p>53,929.51</p>
        <span>{{ this.i18n === "cn" ? "每个地址预计分红" : "Dividend for each address" }}</span>
      </div>
      <div class="grid-list-item">
         <p>{{transferRewardPoolAmount}}</p>
        <span>{{ this.i18n === "cn" ? "大奖池" : "Prize Pool" }}</span>
      </div>
      <div class="grid-list-item">
         <p>2</p>
        <span>{{ this.i18n === "cn" ? "发奖次数" : "Number of prizes issued" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import TronWeb from "tronweb";
export default {
  name: "grid",
  data() {
    return {
      investContract: "TNrXTDu4pX24G18PBdn3jfrtVeb4jrkCTY",
      contract: "",
      tronweb: "",
      address: "",
      precision: 6,
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
      divideUserCount: "-",
      divideCount: "-",
    };
  },
  props: ['i18n'],
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
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: "token",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          data: [],
        },
      ],
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
      // this.getTransferRewardPoolAmount();
      // this.getBurnRate();
      this.getTotalSupply();
    },
    async login() {
      // 实例化合约
      await this.tronweb.setAddress("TWSuK6c6h9NrnXZEHLrnu8DHaDv1kNFgf6");
      console.log(this.tronweb.isAddress("TWSuK6c6h9NrnXZEHLrnu8DHaDv1kNFgf6"));
      try {
        this.contract = await this.tronweb.contract().at(this.investContract);
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
      this.tronweb.trx.getAccount('TLB6vvcENg5SBiHw9zQBpVrwTcYCFG5R3G').then(result => {
        this.dividePoolAmount = result.balance;
      })
      // this.dividePoolAmount =
      //     ((await this.contract.DividePoolAmount().call()) /
      //         Math.pow(10, this.precision)).toFixed(2);
    },
    // 交易奖池金额
    async getTransferRewardPoolAmount() {
      this.tronweb.trx.getAccount('TEt3SuPdjhSpo9U2DUbSSuWaQNMiQjzrw3').then(result => {
        this.transferRewardPoolAmount = result.balance;
      })
      // this.transferRewardPoolAmount =
      //     ((await this.contract.TransferRewardPoolAmount().call()) /
      //         Math.pow(10, this.precision)).toFixed(2);
    },
    // 当前燃烧率
    async getBurnRate() {
      this.burnRate = (await this.contract.getBurnRate().call()) + "%";
    },
    // 代币流通量
    async getTotalSupply() {
      this.totalSupply =
          ((await this.contract.totalSupply().call()) /
          Math.pow(10, this.precision)).toFixed(2);
      this.otherToken = (this.total - this.totalSupply).toFixed(2)

      // this.myChart.setOption({
      //   series: [
      //     {
      //       name: "token",
      //       data: [
      //         {
      //           value: this.totalSupply,
      //           name: '流通代币',
      //           itemStyle: { color: "#0EC8FF" },
      //         },
      //         {
      //           value: this.total - this.totalSupply,
      //           name: '已销毁代币',
      //           itemStyle: { color: "#E500FF" },
      //         },
      //       ],
      //     },
      //   ],
      // });
    },
  },
}
</script>

<style scoped>
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
    box-shadow: 0 0 3rem -1rem rgba(0,0,0,0.5);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }
  .grid .grid-list-item:hover {
    box-shadow: 0 0.5em 3rem -1rem rgba(0,0,0,0.5);
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
</style>