<template>
  <div class="alert">
    <div class="zhezhao">
      <div class="alertMain">
        <div class="title">
          温馨提示 {{ title }}
        </div>
        <div class="context">
          {{ context }}
        </div>
        <div class="btnList">
          <div @click="cancelEvent" class="btn cancel">取消</div>
          <div @click="comfirmEvent" class="btn comfirm">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'context', 'cancelEvent', 'comfirmEvent'],
}
</script>

<style lang="less">   // 这里要设置一下lang="less"，否则默认的是css
@theme-color: orange;
@default-size: 18px;
@font-color: #fff;
@zhezhaopai: 0.4;

.fullScreen() {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.defaultPadding() {
  padding: 10px;
}

.button(@padding:20px) {
  padding: 20px;
  text-align: center;

}

.alert {
  .fullScreen();

  .zhezhao {
    .fullScreen();
    background: rgba(0, 0, 0, @zhezhaopai);
    justify-content: center; // 项目位于水平中心
    align-items: center; // 项目位于垂直中心
  }

  .alertMain {
    width: 600px;
    height: 400px;
    background: #fff;
    display: flex;
    flex-direction: column; // 项目垂直分布
    position: relative;

    .title {
      font-size: @default-size;
      height: 50px;
      background: @theme-color;
      color: @font-color;
      .defaultPadding();
      text-align: left;
      line-height: 50px;
      font-weight: 900;
    }

    .context {
      .defaultPadding();
      font-size: @default-size;
    }

    .btnList {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      width: 100%;
    }

    .btn {
      .button();
      width: 50%;
    }

    .cancel {
      background: pink;
      color: @font-color;
    }

    .comfirm {
      background: yellowgreen;
      color: @font-color;
    }
  }
}

</style>