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
          <!-- <div id="canvas"></div> -->
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
            <p style="text-align:left;">
               {{
              this.i18n === "cn"?"由于玩家期待IBT项目挖矿,项目组加快研发速度。IBTC挖矿已经完成测试阶段.":"As players look forward to mining the IBT project, the project team speeds up research and development. IBTC mining has completed the testing phase."}}
              <br />
                 {{
              this.i18n === "cn"?"现推出子币空投活动 IBTC子币计划 IBTC发行量:100000000":"Now launching the sub-coin airdrop event IBTC sub-coin plan IBTC circulation: 100000000"}} <br />
                 {{
              this.i18n === "cn"?"团队持有:10000000，两年解锁":"Team holding: 10,000,000, unlocked in two years"}} <br />
                 {{
              this.i18n === "cn"?"空投数量:10000000，剩余代币，通过燃烧数值投放 ":"Number of airdrops: 10000000, the remaining tokens will be injected by burning value"}}<br />
                 {{
              this.i18n === "cn"?"9.19号12:00进行快根据活跃地址进行空投 ":"9.19, 12:00, airdrop according to active address"}}<br />
                 {{
              this.i18n === "cn"?"活跃地址:快照前24小时没有转出记录 具体投放比例如下:":"Active address: There is no transfer record 24 hours before the snapshot. The specific delivery ratio is as follows:"}} <br />
                 {{
              this.i18n === "cn"?"1，持有10000以及10000以下IBT Token， 分配比例为10:1 ":"1. Holding 10,000 and below IBT Token, the distribution ratio is 10:1"}}<br />
                 {{
              this.i18n === "cn"?"2，持有10000以上-50000 IBT Token 分配比例为5:1 ":"2. The distribution ratio of holding more than 10,000 to 50,000 IBT Token is 5:1"}}<br />
                 {{
              this.i18n === "cn"?"3，持有50000-150000 ":"3. Hold 50000-150000"}}<br />
                 {{
              this.i18n === "cn"?"IBT Token 分配比例为2:1 4，持有200000-350000 IBT Token ":"The distribution ratio of IBT Token is 2:1 4. Holds 200,000-350000 IBT Token"}}<br />
                 {{
              this.i18n === "cn"?"分配比例为1:1 ":"The distribution ratio is 1:1"}}<br />
            </p>
            <br />
            <a
              class="download"
              href="https://justswap.zendesk.com/hc/zh-cn/articles/360047260472-%E5%A6%82%E4%BD%95%E5%85%91%E6%8D%A2token-"
              target="_blank"
              >{{ this.i18n === "cn" ? "去兑换" : "To exchange" }}
              <!-- <div>
                <svg viewBox="0 0 24 24"></svg>
              </div> -->
            </a>
            <br /><br /><br />
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
      <div class="copyright">© 2020 ibtofficial01@gmail.com</div>
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
    Grid
  },
  data() {
    return {
      titleFixed: false,
      i18n: "cn",
      publicPath: process.env.BASE_URL,
      message1: "TSPUcs5X1wxGf7q9ni6TBtpA9ZyvKQyVga",
      message2: "TTxwHsrDARP1cCzkYssXhDHGJEk3DueihS",
      message3: "TWSuK6c6h9NrnXZEHLrnu8DHaDv1kNFgf6"
    };
  },
  activated() {
    this.titleFixed = false;
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    ani() {
      var renderer, scene, camera, circle, skelet, particle;
      window.onload = function() {
        init();
        animate();
      };

      function init() {
        renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(
          window.devicePixelRatio ? window.devicePixelRatio : 1
        );
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = false;
        renderer.setClearColor(0x000000, 0.0);
        // document.getElementById("canvas").appendChild(renderer.domElement);

        scene = new window.THREE.Scene();

        camera = new window.THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          1,
          1000
        );
        camera.position.z = 400;
        scene.add(camera);

        circle = new window.THREE.Object3D();
        skelet = new window.THREE.Object3D();
        particle = new window.THREE.Object3D();

        scene.add(circle);
        scene.add(skelet);
        scene.add(particle);

        var geometry = new window.THREE.TetrahedronGeometry(2, 0);
        var geom = new window.THREE.IcosahedronGeometry(7, 1);
        var geom2 = new window.THREE.IcosahedronGeometry(15, 1);

        var material = new window.THREE.MeshPhongMaterial({
          color: 0xffffff,
          shading: window.THREE.FlatShading,
        });

        for (var i = 0; i < 1000; i++) {
          var mesh = new window.THREE.Mesh(geometry, material);
          mesh.position
            .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
            .normalize();
          mesh.position.multiplyScalar(90 + Math.random() * 700);
          mesh.rotation.set(
            Math.random() * 2,
            Math.random() * 2,
            Math.random() * 2
          );
          particle.add(mesh);
        }

        var mat = new window.THREE.MeshPhongMaterial({
          color: 0xffffff,
          shading: window.THREE.FlatShading,
        });

        var mat2 = new window.THREE.MeshPhongMaterial({
          color: 0xffffff,
          wireframe: true,
          side: window.THREE.DoubleSide,
        });

        var planet = new window.THREE.Mesh(geom, mat);
        planet.scale.x = planet.scale.y = planet.scale.z = 16;
        circle.add(planet);

        var planet2 = new window.THREE.Mesh(geom2, mat2);
        planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
        skelet.add(planet2);

        var ambientLight = new window.THREE.AmbientLight(0x999999);
        scene.add(ambientLight);

        var lights = [];
        lights[0] = new window.THREE.DirectionalLight(0xffffff, 1);
        lights[0].position.set(1, 0, 0);
        lights[1] = new window.THREE.DirectionalLight(0x11e8bb, 1);
        lights[1].position.set(0.75, 1, 0.5);
        lights[2] = new window.THREE.DirectionalLight(0x8200c9, 1);
        lights[2].position.set(-0.75, -1, 0.5);
        scene.add(lights[0]);
        scene.add(lights[1]);
        scene.add(lights[2]);

        window.addEventListener("resize", onWindowResize, false);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        requestAnimationFrame(animate);

        particle.rotation.x += 0.0;
        particle.rotation.y -= 0.004;
        circle.rotation.x -= 0.002;
        circle.rotation.y -= 0.003;
        skelet.rotation.x -= 0.001;
        skelet.rotation.y += 0.002;
        renderer.clear();

        renderer.render(scene, camera);
      }
    },
    onCopy(msg) {
      this.$toasted
        .show(
          (this.i18n === "cn" ? "复制成功！" : "Copy successfully！") +
            msg.text,
          {
            className: "copy_success"
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
    }
  },
  mounted() {
    this.titleFixed = false;
    window.addEventListener("scroll", this.handleScroll);
    this.ani();
    // const timeDiff = moment(moment("2020-09-15 12:00:00")).diff(new Date());
    // var deadline = new Date(Date.parse(new Date()) + timeDiff);
    // let clockdDom = new Clock(new Date(deadline), function() {});
    // let clockBox = document.querySelector("#clock");
    // clockBox.appendChild(clockdDom.el);
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:800);
#canvas{
    background: #11e8bb; /* Old browsers */
  background: -moz-linear-gradient(
    top,
    #11e8bb 0%,
    #8200c9 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #11e8bb 0%,
    #8200c9 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #11e8bb 0%,
    #8200c9 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#11e8bb', endColorstr='#8200c9',GradientType=0 ); /* IE6-9 */
  position:fixed;
  z-index: 0;
  top: 0;
}
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
