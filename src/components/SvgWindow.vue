<template>
  <svg
    ref="svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    @mousemove="onmousemove"
    @mousedown="onmousedown"
  >
    <slot />
  </svg>
</template>

<script>
import { throttle } from "lodash-es";
export default {
  name: "SvgWindow",
  props: {
    height: Number,
    width: Number,
  },
  data() {
    return {
      zoom: 1,
      viewport: {
        minX: -this.width / 2,
        minY: -this.height / 2,
      },
      mousedownAt: {
        x: null,
        y: null,
      },
      previousViewport: {
        minX: -this.width / 2,
        minY: -this.height / 2,
      },
    };
  },
  computed: {
    viewBox() {
      return [this.viewport.minX, this.viewport.minY, this.width, this.height]
        .map((x) => x / this.zoom)
        .join(" ");
    },
  },
  beforeUnmount() {
    this.$refs.svg.removeEventListener("wheel", this.onwheel);
    document.removeEventListener("keydown", this.onkeydown);
  },
  mounted() {
    this.$refs.svg.addEventListener("wheel", this.onwheel, { passive: true });
    document.addEventListener("keydown", this.onkeydown);
  },
  methods: {
    onwheel(e) {
      if (e.deltaY > 0) {
        // wheel down
        this.zoom /= 2;
      } else {
        // wheel up
        this.zoom *= 2;
      }

      // mouse coords relative to svg element
      const { offsetX, offsetY } = e;
      console.debug({ zoom: this.zoom });
    },
    onkeydown(e) {
      switch (e.code) {
        case "ArrowUp":
          this.viewport.minY -= 50;
          break;
        case "ArrowRight":
          this.viewport.minX += 50;
          break;
        case "ArrowDown":
          this.viewport.minY += 50;
          break;
        case "ArrowLeft":
          this.viewport.minX -= 50;
          break;
      }
    },
    onmousedown(e) {
      this.mousedownAt = {
        x: e.offsetX,
        y: e.offsetY,
      };

      this.previousViewport = { ...this.viewport };
    },
    onmousemove: throttle(function (e) {
      if (e.buttons) {
        // left click is pressed
        const { offsetX, offsetY } = e;

        const dx = offsetX - this.mousedownAt.x;
        const dy = offsetY - this.mousedownAt.y;

        this.viewport.minX = this.previousViewport.minX - dx;
        this.viewport.minY = this.previousViewport.minY - dy;
      }
    }, 20),
  },
};
</script>
<style scoped>
.debug {
}

.debug > text {
}
</style>