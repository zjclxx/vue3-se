<template>
  <div class="container">
    <!-- Hours -->

    <div class="spinner" id="spinner_h1">
      <div class="num num_0" id="num_0_h1">
        <div>0</div>
      </div>
      <div class="num num_1" id="num_1_h1">
        <div>1</div>
      </div>
      <div class="num num_2" id="num_2_h1">
        <div>2</div>
      </div>
    </div>

    <div class="spinner" id="spinner_h2">
      <div class="num num_0" id="num_0_h2">
        <div>0</div>
      </div>
      <div class="num num_1" id="num_1_h2">
        <div>1</div>
      </div>
      <div class="num num_2" id="num_2_h2">
        <div>2</div>
      </div>
      <div class="num num_3" id="num_3_h2">
        <div>3</div>
      </div>
      <div class="num num_4" id="num_4_h2">
        <div>4</div>
      </div>
      <div class="num num_5" id="num_5_h2">
        <div>5</div>
      </div>
      <div class="num num_6" id="num_6_h2">
        <div>6</div>
      </div>
      <div class="num num_7" id="num_7_h2">
        <div>7</div>
      </div>
      <div class="num num_8" id="num_8_h2">
        <div>8</div>
      </div>
      <div class="num num_9" id="num_9_h2">
        <div>9</div>
      </div>
    </div>

    <!-- Minutes -->

    <div class="spinner" id="spinner_m1">
      <div class="num num_0" id="num_0_m1">
        <div>0</div>
      </div>
      <div class="num num_1" id="num_1_m1">
        <div>1</div>
      </div>
      <div class="num num_2" id="num_2_m1">
        <div>2</div>
      </div>
      <div class="num num_3" id="num_3_m1">
        <div>3</div>
      </div>
      <div class="num num_4" id="num_4_m1">
        <div>4</div>
      </div>
      <div class="num num_5" id="num_5_m1">
        <div>5</div>
      </div>
    </div>

    <div class="spinner" id="spinner_m2">
      <div class="num num_0" id="num_0_m2">
        <div>0</div>
      </div>
      <div class="num num_1" id="num_1_m2">
        <div>1</div>
      </div>
      <div class="num num_2" id="num_2_m2">
        <div>2</div>
      </div>
      <div class="num num_3" id="num_3_m2">
        <div>3</div>
      </div>
      <div class="num num_4" id="num_4_m2">
        <div>4</div>
      </div>
      <div class="num num_5" id="num_5_m2">
        <div>5</div>
      </div>
      <div class="num num_6" id="num_6_m2">
        <div>6</div>
      </div>
      <div class="num num_7" id="num_7_m2">
        <div>7</div>
      </div>
      <div class="num num_8" id="num_8_m2">
        <div>8</div>
      </div>
      <div class="num num_9" id="num_9_m2">
        <div>9</div>
      </div>
    </div>

    <!-- Seconds -->

    <div class="spinner" id="spinner_s1">
      <div class="num num_0" id="num_0_s1">
        <div>0</div>
      </div>
      <div class="num num_1" id="num_1_s1">
        <div>1</div>
      </div>
      <div class="num num_2" id="num_2_s1">
        <div>2</div>
      </div>
      <div class="num num_3" id="num_3_s1">
        <div>3</div>
      </div>
      <div class="num num_4" id="num_4_s1">
        <div>4</div>
      </div>
      <div class="num num_5" id="num_5_s1">
        <div>5</div>
      </div>
    </div>

    <div class="spinner" id="spinner_s2">
      <div class="num num_0" id="num_0_s2">
        <div>0</div>
      </div>
      <div class="num num_1" id="num_1_s2">
        <div>1</div>
      </div>
      <div class="num num_2" id="num_2_s2">
        <div>2</div>
      </div>
      <div class="num num_3" id="num_3_s2">
        <div>3</div>
      </div>
      <div class="num num_4" id="num_4_s2">
        <div>4</div>
      </div>
      <div class="num num_5" id="num_5_s2">
        <div>5</div>
      </div>
      <div class="num num_6" id="num_6_s2">
        <div>6</div>
      </div>
      <div class="num num_7" id="num_7_s2">
        <div>7</div>
      </div>
      <div class="num num_8" id="num_8_s2">
        <div>8</div>
      </div>
      <div class="num num_9" id="num_9_s2">
        <div>9</div>
      </div>
    </div>

    <div class="top">></div>
  </div>
</template>

<script setup>
  import { nextTick, onMounted } from "vue";

  // function tog_class(id, cl) {
  //   var elem = document.getElementById(id);
  //   if (elem == null) {
  //     return 0;
  //   }
  //   if (elem.classList.contains(cl) === true) {
  //     elem.classList.remove(cl);
  //   } else {
  //     elem.classList.add(cl);
  //   }
  // }

  function add_class(id, cl) {
    const elem = document.getElementById(id);
    if (elem == null) {
      return 0;
    }
    if (elem.classList.contains(cl) !== true) {
      elem.classList.add(cl);
    }
  }

  function rem_class(id, cl) {
    const elem = document.getElementById(id);
    if (elem == null) {
      return 0;
    }
    if (elem.classList.contains(cl) === true) {
      elem.classList.remove(cl);
    }
  }

  //This function gets the date and does operations using H/M/S

  function startTime() {
    const today = new Date();
    const h = today.getHours();
    const m = today.getMinutes();
    const s = today.getSeconds();

    const h1 = (h - (h % 10)) / 10;
    const h2 = h % 10;

    const m1 = (m - (m % 10)) / 10;
    const m2 = m % 10;

    const s1 = (s - (s % 10)) / 10;
    const s2 = s % 10;

    set_spin_class("s1", s1);
    set_spin_class("s2", s2);

    set_spin_class("m1", m1);
    set_spin_class("m2", m2);

    set_spin_class("h1", h1);
    set_spin_class("h2", h2);

    const t = setTimeout(startTime, 500);
  }

  //This function calls the appropriate class changes

  // It receives the type of spinner to change (m1 for example) and changes classes based on the current time

  function set_spin_class(target, val) {
    for (let i = 0; i < 10; i++) {
      if (i != val) {
        rem_class("spinner_" + target, "spinner_" + target + "_" + i);
        rem_class("num_" + i + "_" + target, "lit");
      }
    }
    add_class("spinner_" + target, "spinner_" + target + "_" + val);
    add_class("num_" + val + "_" + target, "lit");

    if (val === 0) {
      deswitcher(target, val);
    } /*These functions prevent the clock from changing direction*/
    setTimeout(function () {
      switcher(target, val);
    }, 500);
  }

  function switcher(target, val) {
    switch ("spinner_" + target + "_" + val) {
      case "spinner_h1_2":
        rem_class("spinner_h1", "spinner_h1_2");
        add_class("spinner_h1", "spinner_h1_switch");
        break;
      case "spinner_h2_9":
        rem_class("spinner_h2", "spinner_h1_2");
        add_class("spinner_h2", "spinner_h2_switch");
        break;

      case "spinner_m1_5":
        rem_class("spinner_m1", "spinner_m1_5");
        add_class("spinner_m1", "spinner_m1_switch");
        break;
      case "spinner_m2_9":
        rem_class("spinner_m2", "spinner_m2_9");
        add_class("spinner_m2", "spinner_m2_switch");
        break;

      case "spinner_s1_5":
        rem_class("spinner_s1", "spinner_s1_5");
        add_class("spinner_s1", "spinner_s1_switch");
        break;
      case "spinner_s2_9":
        rem_class("spinner_s2", "spinner_s2_9");
        add_class("spinner_s2", "spinner_s2_switch");
        break;
    }
  }
  function deswitcher(target, val) {
    rem_class("spinner_" + target, "spinner_" + target + "_switch");
  }

  onMounted(() => {
    startTime();
  });
</script>

<style lang="scss" scoped>
  /*Size*/

  $base: 6vmin;
  .spinner {
    position: absolute;
    border-radius: 100%;
    overflow: hidden;
  }
  .num {
    display: block;
    position: absolute;
    width: 100%;
    line-height: 110%;
  }
  /*Hours*/

  #spinner_h1 .num_1 {
    transform: rotate(120deg);
  }
  #spinner_h1 .num_2 {
    transform: rotate(240deg);
  }
  #spinner_h2 .num_1 {
    transform: rotate(36deg);
  }
  #spinner_h2 .num_2 {
    transform: rotate(72deg);
  }
  #spinner_h2 .num_3 {
    transform: rotate(108deg);
  }
  #spinner_h2 .num_4 {
    transform: rotate(144deg);
  }
  #spinner_h2 .num_5 {
    transform: rotate(180deg);
  }
  #spinner_h2 .num_6 {
    transform: rotate(216deg);
  }
  #spinner_h2 .num_7 {
    transform: rotate(252deg);
  }
  #spinner_h2 .num_8 {
    transform: rotate(288deg);
  }
  #spinner_h2 .num_9 {
    transform: rotate(324deg);
  }
  /*Minutes*/

  #spinner_m1 .num_1 {
    transform: rotate(60deg);
  }
  #spinner_m1 .num_2 {
    transform: rotate(120deg);
  }
  #spinner_m1 .num_3 {
    transform: rotate(180deg);
  }
  #spinner_m1 .num_4 {
    transform: rotate(240deg);
  }
  #spinner_m1 .num_5 {
    transform: rotate(300deg);
  }
  #spinner_m2 .num_1 {
    transform: rotate(36deg);
  }
  #spinner_m2 .num_2 {
    transform: rotate(72deg);
  }
  #spinner_m2 .num_3 {
    transform: rotate(108deg);
  }
  #spinner_m2 .num_4 {
    transform: rotate(144deg);
  }
  #spinner_m2 .num_5 {
    transform: rotate(180deg);
  }
  #spinner_m2 .num_6 {
    transform: rotate(216deg);
  }
  #spinner_m2 .num_7 {
    transform: rotate(252deg);
  }
  #spinner_m2 .num_8 {
    transform: rotate(288deg);
  }
  #spinner_m2 .num_9 {
    transform: rotate(324deg);
  }
  /*Seconds*/

  #spinner_s1 .num_1 {
    transform: rotate(60deg);
  }
  #spinner_s1 .num_2 {
    transform: rotate(120deg);
  }
  #spinner_s1 .num_3 {
    transform: rotate(180deg);
  }
  #spinner_s1 .num_4 {
    transform: rotate(240deg);
  }
  #spinner_s1 .num_5 {
    transform: rotate(300deg);
  }
  #spinner_s2 .num_1 {
    transform: rotate(36deg);
  }
  #spinner_s2 .num_2 {
    transform: rotate(72deg);
  }
  #spinner_s2 .num_3 {
    transform: rotate(108deg);
  }
  #spinner_s2 .num_4 {
    transform: rotate(144deg);
  }
  #spinner_s2 .num_5 {
    transform: rotate(180deg);
  }
  #spinner_s2 .num_6 {
    transform: rotate(216deg);
  }
  #spinner_s2 .num_7 {
    transform: rotate(252deg);
  }
  #spinner_s2 .num_8 {
    transform: rotate(288deg);
  }
  #spinner_s2 .num_9 {
    transform: rotate(324deg);
  }

  .container {
    overflow: hidden;
    position: relative;
    width: calc($base * 14);
    height: calc($base * 14);
    top: calc(50% - ($base * 7));
    margin-left: auto;
    margin-right: auto;
    background-color: #112;
    * {
      -webkit-backface-visibility: hidden;
      -webkit-transform: translateZ(0) scale(1, 1);
    }
  }
  #spinner_s2 {
    top: calc($base * 0);
    left: calc($base * 0);
  }
  #spinner_s1 {
    top: calc($base * 1);
    left: calc($base * 1);
  }
  #spinner_m2 {
    top: calc($base * 2);
    left: calc($base * 2);
  }
  #spinner_m1 {
    top: calc($base * 3);
    left: calc($base * 3);
  }
  #spinner_h2 {
    top: calc($base * 4);
    left: calc($base * 4);
  }
  #spinner_h1 {
    top: calc($base * 5);
    left: calc($base * 5);
  }
  #spinner_s2 {
    width: calc($base * 14);
    height: calc($base * 14);
  }
  #spinner_s1 {
    width: calc($base * 12);
    height: calc($base * 12);
  }
  #spinner_m2 {
    width: calc($base * 10);
    height: calc($base * 10);
  }
  #spinner_m1 {
    width: calc($base * 8);
    height: calc($base * 8);
  }
  #spinner_h2 {
    width: calc($base * 6);
    height: calc($base * 6);
  }
  #spinner_h1 {
    width: calc($base * 4);
    height: calc($base * 4);
  }
  .num {
    font-size: $base;
  }
  #spinner_h1 .num,
  #spinner_h2 .num,
  #spinner_m1 .num,
  #spinner_m2 .num,
  #spinner_s1 .num,
  #spinner_s2 .num {
    top: 50%;
    height: $base;
    margin-top: calc($base / -2);
  }
  /*.num div {
  	padding-left:calc($base/7);
  }
  */

  .num div {
    float: right;
    padding: 0;
    width: calc($base / 1.1);
    text-align: center;
    color: darkgoldenrod;
  }
  .top {
    position: absolute;
    display: block;
    box-sizing: border-box;
    top: calc($base * 6);
    left: calc($base * 6);
    width: calc($base * 2);
    height: calc($base * 2);
    padding-left: calc($base / 3);
    text-align: center;
    line-height: 165%;
    font-size: $base;
    border: calc($base / 10) solid GoldenRod;
    border-radius: 100%;
    overflow: hidden;
    color: ivory;
  }
  .spinner {
    border: calc($base / 10) solid GoldenRod;
    box-sizing: border-box;
  }
  #spinner_s1,
  #spinner_m1,
  #spinner_h1 {
    border: calc($base / 15) solid rgba(218, 165, 32, 0.3);
  }
  /*Transitions !*/

  /*Hours*/
  .spinner_h1_0 {
    transform: rotate(360deg);
  }
  .spinner_h1_1 {
    transform: rotate(240deg);
  }
  .spinner_h1_2 {
    transform: rotate(120deg);
  }
  .spinner_h1_switch {
    transform: rotate(480deg);
    transition: none !important;
  }
  .spinner_h2_0 {
    transform: rotate(360deg);
  }
  .spinner_h2_1 {
    transform: rotate(324deg);
  }
  .spinner_h2_2 {
    transform: rotate(288deg);
  }
  .spinner_h2_3 {
    transform: rotate(252deg);
  }
  .spinner_h2_4 {
    transform: rotate(216deg);
  }
  .spinner_h2_5 {
    transform: rotate(180deg);
  }
  .spinner_h2_6 {
    transform: rotate(144deg);
  }
  .spinner_h2_7 {
    transform: rotate(108deg);
  }
  .spinner_h2_8 {
    transform: rotate(72deg);
  }
  .spinner_h2_9 {
    transform: rotate(36deg);
  }
  .spinner_h2_switch {
    transform: rotate(396deg);
    transition: none !important;
  }
  /*Minutes*/
  .spinner_m1_0 {
    transform: rotate(360deg);
  }
  .spinner_m1_1 {
    transform: rotate(300deg);
  }
  .spinner_m1_2 {
    transform: rotate(240deg);
  }
  .spinner_m1_3 {
    transform: rotate(180deg);
  }
  .spinner_m1_4 {
    transform: rotate(120deg);
  }
  .spinner_m1_5 {
    transform: rotate(60deg);
  }
  .spinner_m1_switch {
    transform: rotate(420deg);
    transition: none !important;
  }
  .spinner_m2_0 {
    transform: rotate(360deg);
  }
  .spinner_m2_1 {
    transform: rotate(324deg);
  }
  .spinner_m2_2 {
    transform: rotate(288deg);
  }
  .spinner_m2_3 {
    transform: rotate(252deg);
  }
  .spinner_m2_4 {
    transform: rotate(216deg);
  }
  .spinner_m2_5 {
    transform: rotate(180deg);
  }
  .spinner_m2_6 {
    transform: rotate(144deg);
  }
  .spinner_m2_7 {
    transform: rotate(108deg);
  }
  .spinner_m2_8 {
    transform: rotate(72deg);
  }
  .spinner_m2_9 {
    transform: rotate(36deg);
  }
  .spinner_m2_switch {
    transform: rotate(396deg);
    transition: none !important;
  }
  /*Seconds*/
  .spinner_s1_0 {
    transform: rotate(360deg);
  }
  .spinner_s1_1 {
    transform: rotate(300deg);
  }
  .spinner_s1_2 {
    transform: rotate(240deg);
  }
  .spinner_s1_3 {
    transform: rotate(180deg);
  }
  .spinner_s1_4 {
    transform: rotate(120deg);
  }
  .spinner_s1_5 {
    transform: rotate(60deg);
  }
  .spinner_s1_switch {
    transform: rotate(420deg);
    transition: none !important;
  }
  .spinner_s2_0 {
    transform: rotate(360deg);
  }
  .spinner_s2_1 {
    transform: rotate(324deg);
  }
  .spinner_s2_2 {
    transform: rotate(288deg);
  }
  .spinner_s2_3 {
    transform: rotate(252deg);
  }
  .spinner_s2_4 {
    transform: rotate(216deg);
  }
  .spinner_s2_5 {
    transform: rotate(180deg);
  }
  .spinner_s2_6 {
    transform: rotate(144deg);
  }
  .spinner_s2_7 {
    transform: rotate(108deg);
  }
  .spinner_s2_8 {
    transform: rotate(72deg);
  }
  .spinner_s2_9 {
    transform: rotate(36deg);
  }
  .spinner_s2_switch {
    transform: rotate(396deg);
    transition: none !important;
  }
  .num div {
    transition: transform 500ms ease-out, color 500ms ease-out,
      font-size 500ms ease-out;
  }
  .lit div {
    color: ivory;
    font-size: calc($base * 1.3);
    transition: transform 500ms ease-out, color 500ms ease-out,
      font-size 500ms ease-out;
  }
  .spinner {
    transition: transform 500ms ease-in;
  }
  /*This fixes a bug on chrome*/
</style>
