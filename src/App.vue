<template>
  <div id="app" :class="this.i18n">
    <div class="top">
      <div class="bg">
        <div class="sticky-placeholder" ref="pride_tab_fixed">
          <div class="sticky" :class="titleFixed ? 'isFixed' : ''">
            <svg-icon iconClass="btc"></svg-icon>
            <a
              href="javascript:void(0)"
              class="i18n"
              v-on:click="changeLanguage"
              >{{ this.i18n === "cn" ? "EN" : "CN" }}</a
            >
            <div class="contract">
              <a
                href="https://t.me/joinchat/P3KX2BpkAxay1z5QvD3OiA"
                target="_blank"
              >
                <svg-icon iconClass="telegram"></svg-icon>
              </a>
              <a
                href="https://twitter.com/michaelibtc/status/1304696849576599553?s=21"
                target="_blank"
              >
                <svg-icon iconClass="twitter"></svg-icon>
              </a>
            </div>
          </div>
        </div>
        <div class="containaer">
          <div>
            <svg viewBox="0 0 600 150">
              <!-- Symbol -->
              <symbol id="s-text">
                <text text-anchor="middle" x="50%" y="50%" dy=".35em">IBT</text>
              </symbol>

              <!-- Duplicate symbols -->
              <use xlink:href="#s-text" class="text-animate" />
              <use xlink:href="#s-text" class="text-animate" />
              <use xlink:href="#s-text" class="text-animate" />
              <use xlink:href="#s-text" class="text-animate" />
              <use xlink:href="#s-text" class="text-animate" />
            </svg>
          </div>
          <div class="t1">
            {{
              `${
                this.i18n === "cn" ? "IBT合约地址: " : "IBT Contract Address: "
              }`
            }}
            <p
              class="address"
              v-clipboard:copy="message3"
              v-clipboard:success="onCopy"
            >
              TWSuK6c6h9NrnXZEHLrnu8DHaDv1kNFgf6
            </p>
            {{
              this.i18n === "cn"
                ? `IBT Token 是基于区块链的新型社会实验型代币。 它基于 Tron 发行，在其智能合约中，除常规功能外，还内嵌了交易燃烧、尾单博 弈、持币分红,子母币四种独特机制。
                代币名称：IBT Token 代币符号：IBT`
                : `IBT Token is a new type of social experimental token based on blockchain. It is issued based on Tron. In addition to conventional functions, its smart contract also embeds four unique mechanisms: transaction burning, tail order game, currency holding dividends, and parent currency.
                Token name: IBT Token Token symbol: IBT`
            }}
            <br />
            {{
              this.i18n === "cn"
                ? "已上波宝钱包，请下载波宝钱包导入合约地址查看资产"
                : "The Bobo Wallet has been uploaded, please download Bobo Wallet and import the contract address to view assets"
            }}<br />
            <a
              class="download"
              href="https://justswap.zendesk.com/hc/zh-cn/articles/360047260472-%E5%A6%82%E4%BD%95%E5%85%91%E6%8D%A2token-"
              target="_blank"
              >{{ this.i18n === "cn" ? "去兑换" : "To exchange" }}
              <!-- <div>
                <svg viewBox="0 0 24 24"></svg>
              </div> -->
            </a>
            <br/><br/><br/>
            <a
              class="ibt-btn"
              :href="`${publicPath}IBT_whitepaper_${this.i18n}.pdf`"
              target="_blank"
            >
              {{ this.i18n === "cn" ? "白皮书" : "White Paper" }}
            </a>
            <!-- {{
              this.i18n === "cn"
                ? `IBT 项目团队感谢第一批私募者，我们不会让你们失望!
            2020-09-15 20:00 (SGT) JustSwap 我们不见不散!`
                : `The IBT project team thanks the first batch of private funders, we will not let you down!
            2020-09-15 20:00 (SGT) JustSwap Let's see or leave!`
            }}
            {{
              this.i18n === "cn"
                ? `IBT正在发币中,如2020-09-15 20:00前未收到请联系客服`
                : `
            IBT is in the process of issuing coins, if you have not received it before 20:00 on 2020-09-15, please contact customer service`
            }} -->
          </div>
          <div class="t2">
            <!-- {{
              this.i18n === "cn"
                ? "因现有匿名社区投资本项目,项目团队特别开放专用私募通道: "
                : "Due to the existing anonymous community investing in this project, the project team has opened a dedicated private equity channel: "
            }}
            <br />
            <span
              class="address"
              v-clipboard:copy="message2"
              v-clipboard:success="onCopy"
              >TTxwHsrDARP1cCzkYssXhDHGJEk3DueihS</span
            >
            <br />
            {{
              this.i18n === "cn"
                ? `私募价格：1TRX：5IBT, 私募资金90%注入 AMM 交易所资金池，10%团队用于运营与开发。
            `
                : `Private placement price: 1TRX: 5IBT, 90% of private equity funds are injected into the AMM exchange fund pool, 10% of the team is used for operation and development`
            }} -->
            <p />
          </div>
        </div>
        <!-- <span class="countdown">
          {{
          this.i18n === "cn" ? "私募倒计时" : "Countdown"
          }}
        </span> -->
        <!-- <div id="clock"></div> -->
      </div>
    </div>
    <Grid :i18n="i18n"></Grid>
    <div class="investors">
      <div class="page_title">
        {{ this.i18n === "cn" ? "合作机构" : "INVESTORS" }}
      </div>
      <div class="investors_list">
        <img src="./assets/c1.png" />
        <img src="./assets/c2.png" />
        <img src="./assets/c3.png" />
        <img src="./assets/c4.png" />
        <img src="./assets/c6.png" />
        <img src="./assets/c7.png" />
        <img src="./assets/c8.png" />
      </div>
    </div>
    <footer>
      <div class="footer-r2"></div>
      <div class="copyright">© 2020 IBT-TOKEN</div>
    </footer>
  </div>
</template>

<script>
// import { Clock } from "./clock.js";
// import moment from "moment";
import Grid from "./components/grid";
import "./clock.less";
export default {
  name: "App",
  components: {
    Grid,
  },
  data() {
    return {
      titleFixed: false,
      i18n: "cn",
      publicPath: process.env.BASE_URL,
      message1: "TSPUcs5X1wxGf7q9ni6TBtpA9ZyvKQyVga",
      message2: "TTxwHsrDARP1cCzkYssXhDHGJEk3DueihS",
      message3: "TWSuK6c6h9NrnXZEHLrnu8DHaDv1kNFgf6",
    };
  },
  activated() {
    this.titleFixed = false;
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    onCopy(msg) {
      this.$toasted
        .show(
          (this.i18n === "cn" ? "复制成功！" : "Copy successfully！") +
            msg.text,
          {
            className: "copy_success",
          }
        )
        .goAway(1500);
    },
    //滚动监听，头部固定
    handleScroll: function() {
      let offsetTop = this.$refs.pride_tab_fixed.getBoundingClientRect().top;
      this.titleFixed = offsetTop < 0;
      // some code
    },
    changeLanguage() {
      this.i18n = this.i18n === "cn" ? "en" : "cn";
    },
  },
  mounted() {
    this.titleFixed = false;
    window.addEventListener("scroll", this.handleScroll);
    // const timeDiff = moment(moment("2020-09-15 12:00:00")).diff(new Date());
    // var deadline = new Date(Date.parse(new Date()) + timeDiff);
    // let clockdDom = new Clock(new Date(deadline), function() {});
    // let clockBox = document.querySelector("#clock");
    // clockBox.appendChild(clockdDom.el);
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:800);
.box-with-text {
  background-image: url("http://skipthepie.org/nutrition-photos/o/18958_130419356684071.jpg");
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

.box-with-text {
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-20%) translateY(-20%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  background-repeat: repeat;
  background-position: 50% 50%;
  background-size: cover;
  white-space: nowrap;
  text-align: center;
  text-transform: uppercase;
  font: 16vmax/0.85 Open Sans, Impact;
}

.text {
  font: 10.5em/1 Open Sans, Impact;
  text-transform: uppercase;
}

.simple {
  fill: url(#gr-simple);
}

.radial {
  fill: url(#gr-radial);
}

/* Colorize pattern */
.g-spots circle:nth-child(5n + 1) {
  fill: #1d4259;
}
.g-spots circle:nth-child(5n + 2) {
  fill: #0a7373;
}
.g-spots circle:nth-child(5n + 3) {
  fill: #30bf7c;
}
.g-spots circle:nth-child(5n + 4) {
  fill: #baf266;
}
.g-spots circle:nth-child(5n + 5) {
  fill: #eef272;
}

.text-pattern {
  fill: url(#p-spots);
  stroke: #1d4259;
  stroke-width: 5;
  stroke-opacity: 0.5;
  font: 10.5em/1 Open Sans, Impact;
  text-transform: uppercase;
  margin: 0;
}

.text-animate {
  font: 10.5em/1 Open Sans, Impact;
  text-transform: uppercase;
  margin: 0;
  fill: none;
  stroke-width: 6;
  stroke-linejoin: round;
  stroke-dasharray: 70 330;
  stroke-dashoffset: 0;
  animation: stroke 6s infinite linear;
}

.text-animate:nth-child(5n + 1) {
  stroke: rgb(29, 161, 242);
  animation-delay: -1.2s;
}

.text-animate:nth-child(5n + 2) {
  stroke: #f5a503;
  animation-delay: -2.4s;
}

.text-animate:nth-child(5n + 3) {
  stroke: #e9f1df;
  animation-delay: -3.6s;
}

.text:nth-child(5n + 4) {
  stroke: #56d9cd;
  animation-delay: -4.8s;
}

.text-animate:nth-child(5n + 5) {
  stroke: #3aa1bf;
  animation-delay: -6s;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: -400;
  }
}
html,
body {
  padding: 0;
  margin: 0;
  font-size: 20px;
}
ul,
li {
  list-style-type: none;
  padding-left: 0;
}
#app {
  font-size: 14px;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}
.top {
  background-image: url(./assets/bg.jpg);
  background-position: center;
  background-size: cover;
  color: #fff;
  text-align: center;
  /* height: 100vh; */
}
.contract {
  position: absolute;
  right: 0.3rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
}
.contract a {
  margin-right: 20px;
  font-style: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #1a98a8;
}
.contract svg {
  cursor: pointer;
}
.top .bg {
  padding-top: 76px;
  padding-bottom: 135px;
}
.top .sticky-placeholder {
  /* height: 103px; */
  margin-bottom: 32px;
}
.top .ibt-logo {
  width: 40px;
  height: 40px;
}
.top .sticky {
  background: transparent;
  z-index: 10;
  color: #fff;
  padding: 0;
  -webkit-transition: all ease 0.5s;
  transition: all ease 0.5s;
  position: relative;
}
.top .sticky.isFixed {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  background: #fff;
  z-index: 10;
  color: #333;
  padding: 10px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
}
@media screen and (max-width: 745px) {
  .top .sticky {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    background: #fff;
    z-index: 10;
    color: #333;
    padding: 10px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
  }
  .top .sticky svg {
    color: rgb(102, 153, 255);
    width: 0.8rem !important;
    height: 0.8rem !important;
  }
  .top .i18n {
    width: 0.8rem !important;
    height: 0.8rem !important;
    line-height: 0.8rem !important;
    background: #1a98a8;
    color: #fff;
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    text-decoration: none;
    font-weight: 700;
  }
  .top .sticky a {
    margin-right: 10px;
  }
  #app .card {
    font-size: 9vw !important;
  }
  .top .t1 {
    font-size: 4.5vw;
  }
}
.top .sticky.isFixed svg {
  color: rgb(102, 153, 255);
  width: 1rem;
  height: 1rem;
}
.top .sticky.isFixed .i18n {
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  background: #1a98a8;
  color: #fff;
  right: 180px;
  position: absolute;
}
.top .sticky svg {
  width: 1.5rem;
  height: 1.5rem;
}
.top .t1 {
  font-size: 2vw;
  font-weight: 500;
  position: relative;
  margin-bottom: 33px;
  /* padding: 0 1rem; */
}
.t1 {
  max-width: 80%;
  margin: 0 auto;
}
.top .t2 {
  /* font-size: 1.8vw;
  font-weight: 300;
  margin-bottom: 57px;
  padding: 0 20%;
  text-align: left; */
}
.ibt-btn {
  text-decoration: none;
  font-size: 22px;
  font-weight: 300;
  color: #3e3e3e;
  padding: 16px 60px;
  border-radius: 40px;
  background: #fff;
  cursor: pointer;
  border: none;
}
footer {
  position: relative;
  background: #1a98a8;
  color: #fff;
  padding: 32px;
}
@media screen and (max-width: 600px) {
  footer {
    padding: 32px;
  }
  .top .t1 {
    font-size: 5vw;
  }
}
footer .copyright {
  position: absolute;
  bottom: 20px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  -ms-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
.i18n {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  background: #fff;
  border-radius: 50%;
  text-decoration: none;
  color: #1a98a8;
  position: absolute;
  right: 230px;
}
.flip-clock__piece {
  position: relative;
}
#app .flip-clock__slot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
}
#app.en .flip-clock__slot.cn {
  font-size: 0;
}
#app.cn .flip-clock__slot.en {
  font-size: 0;
}
#app .card {
  font-size: 6vw;
}
#app .address {
  cursor: pointer;
  text-decoration: underline;
  word-break: break-all;
}
.countdown {
  font-size: 20px;
}
.containaer {
  margin-bottom: 30px;
}
.page_title {
  font-size: 42px;
  font-weight: 500;
  position: relative;
  margin-bottom: 58px;
  text-align: center;
  margin-bottom: 75px;
}
.page_title::after {
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
.investors {
  padding: 0 20px;
  padding-top: 100px;
  padding-bottom: 80px;
  max-width: 1200px;
  margin: auto;
}
.investors img {
  height: 64px;
  width: 100%;
  -o-object-fit: contain;
  object-fit: contain;
}
.investors_list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  -webkit-column-gap: 60px;
  column-gap: 60px;
  row-gap: 50px;
}
@media screen and (max-width: 600px) {
  .investors_list {
    grid-template-columns: repeat(2, 1fr);
    -webkit-column-gap: 30px;
    column-gap: 30px;
    row-gap: 15px;
  }
}
.download {
  background: rgb(102, 153, 255);
  color: #fff;
  display: inline-block;
  width: 150px;
  height: 60px;
  line-height: 60px;
  border-radius: 8px;
  text-decoration: unset;
  margin-top: 20px;
}
</style>
