<template>
  <div class="split-pane" :class="direction" :style="{ flexDirection: direction }" ref="splitpaneRef">
    <div class="pane pane-one" :style="lengthType + `:${paneLengthValue}`">
      <slot name="leftContent"></slot>
    </div>
    <div class="pane-trigger" :style="lengthType + `:${triggerWidthValue}`" @mousedown="mousehandler"></div>
    <div class="pane pane-two">
      <slot name="rightContent">
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
export default defineComponent({
  name: "splitpane",
  props: {
    direction: {
      type: String,
      default: "row", // column
    },
    maxWidth: {
      type: Number,
      default: 90,
    },
    minWidth: {
      type: Number,
      default: 10,
    },
  },
  setup(props: any, context: any) {
    console.log("``````````````````````````````````");
    console.log(props);
    console.log(context);
    console.log("``````````````````````````````````");
    
    const splitpaneRef = ref<any>(null); // ref写入key值
    const paneLengthPercent = ref(50); // 第一内容区宽度（%）
    const triggerWidth = ref<number>(10); //  切换第一内容宽度控制器
    const triggerOffset = ref<number>(0); //  控制器偏移量
    const paneLengthValue = computed(() => `calc(${paneLengthPercent.value}% - ${triggerWidth.value / 2}px)`);
    const triggerWidthValue = computed(() => triggerWidth.value + "px");
    const lengthType = computed(() => (props.direction === "row" ? "width" : "height"));

    function mousehandler(e: any) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      if (props.direction === "row") {
        triggerOffset.value = e.pageX - e.srcElement.getBoundingClientRect().left;
      } else {
        triggerOffset.value = e.pageY - e.srcElement.getBoundingClientRect().top;
      }
    }

    function handleMouseMove(e: any) {
      const clientLeft = splitpaneRef.value.getBoundingClientRect(); // 获取当前容器的距离页面左边宽度
      let paneLeftWidth: number, offset: number;

      if (props.direction === "row") {
        // 鼠标距离页面左边的距离 - 当前容器距离左边的距离 - 鼠标在控制器上面的位置 - 控制器宽度 / 2 => 获得当前位置
        offset = e.pageX - clientLeft.left - triggerOffset.value + triggerWidth.value / 2; // 页面x距离减去容器左边值
        paneLeftWidth = (offset / clientLeft.width) * 100;
      } else {
        offset = e.pageY - clientLeft.top - triggerOffset.value + triggerWidth.value / 2;
        paneLeftWidth = (offset / clientLeft.height) * 100;
      }

      if (props.maxWidth < paneLeftWidth) {
        paneLeftWidth = props.maxWidth;
      } else if (props.minWidth > paneLeftWidth) {
        paneLeftWidth = props.minWidth;
      }

      paneLengthPercent.value = paneLeftWidth;
    }

    function handleMouseUp(e: any) {
      document.removeEventListener("mousemove", handleMouseMove);
    }
    return {
      lengthType,
      paneLengthValue,
      triggerWidthValue,
      mousehandler,
      splitpaneRef,
    };
  },
});
</script>

<style lang="stylus">
.split-pane {
  background: palegreen;
  height: 100%;
  display: flex;
  &.row {
    .pane {
      height: 100%;
    }
    .pane-trigger {
      height: 100%;
      cursor: col-resize;
    }
  }
  &.column {
    .pane {
      width: 100%;
    }
    .pane-trigger {
      width: 100%;
      cursor row-resize
    }
  }
  .pane-one {
    background: palevioletred;
  }
  .pane-trigger {
    background: palegoldenrod;

  }
  .pane-two {
    flex: 1;
    background: turquoise;
  }
}
</style>
