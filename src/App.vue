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
            >
              {{ this.i18n === "cn" ? "中文" : "EN" }}
            </a>
            <div class="contract">
              <a
                href="https://t.me/joinchat/P3KX2BpkAxay1z5QvD3OiA"
                target="_blank"
              >
                <svg-icon iconClass="telegram"> </svg-icon
              ></a>
              <a
                href="https://twitter.com/michaelibtc/status/1304696849576599553?s=21"
                target="_blank"
              >
                <svg-icon iconClass="twitter"></svg-icon
              ></a>
            </div>
          </div>
        </div>
        <div class="containaer">
          <div class="t1">
            {{
              this.i18n === "cn"
                ? "IBT Token 私募活动火热进行中！起投金额5000TRX"
                : "The private placement of IBT tokens is underway!"
            }}
            <br />
            {{ this.i18n === "cn" ? "私募地址：" : "Cryptocurrency wallet：" }}
            <span
              class="address"
              v-clipboard:copy="message"
              v-clipboard:success="onCopy"
            >
              TSPUcs5X1wxGf7q9ni6TBtpA9ZyvKQyVga
            </span>
          </div>
          <div class="t2">
            {{
              this.i18n === "cn"
                ? `IBT Token 是基于区块链的新型社会实验型代币。 它基于 Tron
            发行，在其智能合约中，除常规功能外，还内嵌了交易燃烧、尾单博
            弈、持币分红,子母币四种独特机制。`
                : `IBT Token is a new type of social experimental token based on blockchain. It is based on Tron
            Issuance, in its smart contract, in addition to regular functions, it also embeds transaction burning and tail order blogging
            There are four unique mechanisms of game, holding currency dividends, and parent currency.`
            }}<br />
            {{
              this.i18n === "cn"
                ? `代币名称：IBT Token 代币符号：IBT`
                : `Token name: IBT Token Token symbol: IBT`
            }}<br />
            {{
              this.i18n === "cn"
                ? `初始总量：100,000,000（交易燃烧会使代币总量持续减少）`
                : `
Initial total amount: 100,000,000 (trading burning will cause the total amount of tokens to continue to decrease)`
            }}
            {{
              this.i18n === "cn"
                ? `代币分配：无预挖、`
                : `Token distribution: no pre-mining`
            }}
            <br />
            {{
              this.i18n === "cn"
                ? `团队无持币，所有代币投入资金池`
                : `The team has no tokens, all tokens are invested in the fund pool`
            }}<br />
            {{ this.i18n === "cn" ? `代币类型：TRC-20` : `Token type: TRC-20`
            }}<br />
            {{
              this.i18n === "cn"
                ? `上线交易所：JustSwap`
                : `Online exchange: JustSwap`
            }}<br />
            {{
              this.i18n === "cn"
                ? `私募价格：1TRX：5IBT, 软顶:3000000TRX，硬顶:5000000TRX，私募资金90%注入 AMM 交易所资金池，10%团队用于运营与开发。
            `
                : `Private placement price: 1TRX: 5IBT, soft cap: 3000000TRX, hard cap: 5000000TRX, 90% of private equity funds are injected into the AMM exchange fund pool, 10% of the team is used for operation and development`
            }}<br />
            <br />
            {{
              this.i18n === "cn"
                ? `上线时间：2020 年 9 月 15 日 20:00`
                : `Online time: 20:00, September 15, 2020`
            }}
            <br />
            <p>
              {{
                this.i18n === "cn"
                  ? `由于IBT项目受到海外投资的赞助,近期有大量假币上线JustSwap,请谨防上当受骗,本项目上线后官网会公布合约地址`
                  : "Since the IBT project is sponsored by overseas investment, a large number of counterfeit currencies have recently been launched on JustSwap. Please beware of being deceived. The official website will announce the contract address after the project is launched."
              }}
            </p>
            <p />
          </div>
          <div class="r3">
            <a :href="`${publicPath}IBT_whitepaper_cn.pdf`" target="_blank">
              <button>
                {{ this.i18n === "cn" ? "白皮书" : "White Paper" }}
              </button>
            </a>
          </div>
        </div>
        <span class="countdown">{{
          this.i18n === "cn" ? "私募倒计时" : "Countdown"
        }}</span>
        <div id="clock"></div>
      </div>
    </div>
    <div class="investors">
      <div class="page_title">
        {{ this.i18n === "cn" ? "合作机构" : "INVESTORS" }}
      </div>
      <div class="investors_list">
        <img src="./assets/c1.png" />
        <img src="./assets/c2.png" />
        <img src="./assets/c3.png" />
        <img src="./assets/c4.png" />
        <img src="./assets/c5.png" />
        <img src="./assets/c6.png" />
        <img src="./assets/c7.png" />
        <img src="./assets/c8.png" />
      </div>
    </div>
    <footer>
      <div class="footer-r2"></div>
      <div class="copyright">© 2020 ibt-blockchain.com</div>
    </footer>
  </div>
</template>

<script>
import { Clock } from "./clock.js";
import moment from "moment";
import "./clock.less";
export default {
  name: "App",
  data() {
    return {
      titleFixed: false,
      i18n: "cn",
      publicPath: process.env.BASE_URL,
      message: "TSPUcs5X1wxGf7q9ni6TBtpA9ZyvKQyVga"
    };
  },
  activated() {
    this.titleFixed = false;
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    onCopy() {
      this.$toasted
        .show(this.i18n === "cn" ? "复制成功！" : "Copy successfully！", {
          className: "copy_success"
        })
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
    }
  },
  mounted() {
    this.titleFixed = false;
    window.addEventListener("scroll", this.handleScroll);
    const timeDiff = moment(moment("2020-09-14 22:00:00")).diff(new Date());
    var deadline = new Date(Date.parse(new Date()) + timeDiff);
    let clockdDom = new Clock(new Date(deadline), function() {});
    let clockBox = document.querySelector("#clock");
    clockBox.appendChild(clockdDom.el);
  }
};
</script>

<style>
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
  background: rgba(0, 63, 96, 0.6);
}
.top .sticky-placeholder {
  height: 103px;
  margin-bottom: 32px;
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
    width: 1rem !important;
    height: 1rem !important;
  }
  .top .i18n {
    width: 1rem !important;
    height: 1rem !important;
    line-height: 1rem;
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
  font-size: 2.5vw;
  font-weight: 500;
  position: relative;
  margin-bottom: 33px;
  /* padding: 0 3rem; */
}
.top .t2 {
  font-size: 1.8vw;
  font-weight: 300;
  margin-bottom: 57px;
  padding: 0 20%;
  text-align: left;
}
.top .r3 button {
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
</style>
