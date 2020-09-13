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
  </div>
</template>

<script>
import TronWeb from "tronweb";
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
    };
  },
  mounted() {
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.trongrid.io");
    const solidityNode = new HttpProvider("https://api.trongrid.io");
    const eventServer = new HttpProvider("https://api.trongrid.io");
    const privateKey =
        "3481E79956D4BD95F358AC96D151C976392FC4E3FC132F78A847906DE588C145";
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
    this.myChart = this.$echarts.init(this.$refs.chart);
    this.myChart.setOption(option);
  },
  methods: {
    init() {
      this.getDividePoolAmount();
      this.getTransferRewardPoolAmount();
      this.getBurnRate();
      this.getTotalSupply();
    },
    async login() {
      // 实例化合约
      await this.tronweb.setAddress("TRZesqGhsPczP2JycXxMhDRmprZzM9DWJQ");
      console.log(this.tronweb.isAddress("TRZesqGhsPczP2JycXxMhDRmprZzM9DWJQ"));
      try {
        this.contract = await this.tronweb.contract().at(this.investContract);
        console.log(this.contract)
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
      this.dividePoolAmount =
          ((await this.contract.DividePoolAmount().call()) /
              Math.pow(10, this.precision)).toFixed(2);
    },
    // 交易奖池金额
    async getTransferRewardPoolAmount() {
      this.transferRewardPoolAmount =
          ((await this.contract.TransferRewardPoolAmount().call()) /
              Math.pow(10, this.precision)).toFixed(2);
    },
    // 当前燃烧率
    async getBurnRate() {
      this.burnRate = (await this.contract.getBurnRate().call()) + "%";
      console.log(this.burnRate)
    },
    // 代币流通量
    async getTotalSupply() {
      this.totalSupply =
          (await this.contract.totalSupply().call()) /
          Math.pow(10, this.precision);
      this.otherToken = (this.total - this.totalSupply).toFixed(3)

      this.myChart.setOption({
        series: [
          {
            name: "token",
            data: [
              {
                value: this.totalSupply,
                name: '流通代币',
                itemStyle: { color: "#0EC8FF" },
              },
              {
                value: this.total - this.totalSupply,
                name: '已销毁代币',
                itemStyle: { color: "#E500FF" },
              },
            ],
          },
        ],
      });
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