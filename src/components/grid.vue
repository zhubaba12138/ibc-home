<template>
  <div class="grid">
    <div class="title">数据面板</div>
    <div class="chart" ref="chart"></div>
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
    padding-top: 4vw;
  }
  .grid .title {
    font-size: 28px;
  }
</style>