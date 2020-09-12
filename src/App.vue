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
                ? "IBT Token 私募活动火热进行中！"
                : "The private placement of IBT tokens is underway!"
            }}
            <br />
            {{
              this.i18n === "cn"
                ? "私募地址：ewrwer324234wewrwer"
                : "address：ewrwer324234wewrwer"
            }}
          </div>
          <div class="t2">
            初始总量：100,000,000（交易燃烧会使代币总量持续减少）<br />
            代币分配：无预挖、团队无持币，所有代币投入资金池<br />
            私募价格：1TRX；3IBT<br />
          </div>
          <div class="r3">
            <a :href="`${publicPath}IBT_whitepaper_cn.pdf`" target="_blank">
              <button>
                {{ this.i18n === "cn" ? "白皮书" : "White Paper" }}
              </button>
            </a>
          </div>
        </div>
        <div id="clock"></div>
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
import axios from "axios";
import moment from "moment";
import "./clock.less";
export default {
  name: "App",
  data() {
    return {
      titleFixed: false,
      i18n: "cn",
      publicPath: process.env.BASE_URL
    };
  },
  activated() {
    this.titleFixed = false;
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    //滚动监听，头部固定
    handleScroll: function() {
      let offsetTop = this.$refs.pride_tab_fixed.getBoundingClientRect().top;
      console.log(offsetTop);
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
    axios
      .get("http://quan.suning.com/getSysTime.do")
      .then(function(response) {
        const timeDiff = moment(moment("2020-09-15 00:00:00")).diff(
          new Date(response.data.sysTime2)
        );
        var deadline = new Date(
          Date.parse(new Date(response.data.sysTime2)) + timeDiff
        );
        let clockdDom = new Clock(new Date(deadline), function() {});
        let clockBox = document.querySelector("#clock");
        clockBox.appendChild(clockdDom.el);
      })
      .catch(function(error) {
        console.log(error);
      });
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
  right: .3rem;
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
  }
  .top .sticky a {
    margin-right: 10px;
  }
  #app .card {
    font-size: 9vw !important;
  }
  .top .t1 {
    font-size: 5vw;
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
  width: 1.5rem ;
  height: 1.5rem ;
}
.top .t1 {
  font-size: 4vw;
  font-weight: 500;
  position: relative;
  margin-bottom: 33px;
  /* padding: 0 3rem; */
}
/* .top .t1::after {
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
  bottom: -9px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  -ms-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
} */
.top .t2 {
  font-size: 2.5vw;
  font-weight: 300;
  margin-bottom: 57px;
  padding: 0 2rem;
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
</style>
