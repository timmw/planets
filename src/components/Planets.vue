<template>
  <div>
    <p v-if="selectedBody">{{ selectedBody.name }}</p>
    <SvgWindow id="svg" :width="1600" :height="800">
      <template v-for="body in bodies">
        <circle
          :key="body.name"
          :cx="body.x"
          :cy="body.y"
          :r="body.radius"
          :fill="body.color"
          @click="selectedBody = body"
        >
          <title>{{ body.name }}</title>
        </circle>
        <circle
          v-for="satellite in body.satellites"
          :key="satellite.name"
          :cx="satellite.x"
          :cy="satellite.y"
          :r="satellite.radius"
          :fill="satellite.color"
          @click="selectedBody = satellite"
        >
          <title>{{ satellite.name }}</title>
        </circle>
      </template>
    </SvgWindow>
    <div class="controls">
      <button @click="togglePlay">Play/pause</button>
      <label>
        Seconds per Earth year:
        <input v-model="scale.secondsPerYear" />
      </label>
      <label>
        Planet scale (km per pixel):
        <input v-model="scale.size" />
      </label>
      <label>
        Distance scale (km per pixel):
        <input v-model="scale.distance" />
      </label>
    </div>
    <!-- <div class="debug">
      <p>Zoom: {{zoom}}</p>
      <p>Center: x: {{center.x}} y: {{center.y}}</p>
    </div>-->
  </div>
</template>

<script>
import SvgWindow from "./SvgWindow.vue";
import bodies from "../simulation/bodies";

const coords = (hyp, θ) => ({
  x: Math.cos(θ) * hyp,
  y: Math.sin(θ) * hyp,
});

const adjustRatios = (body, t, scale, origin = { x: 0.0, y: 0.0 }) => {
  const θ =
    body.orbitalPeriod > 0 ? t * ((2 * Math.PI) / body.orbitalPeriod) : 0;

  const c = coords(body.avgDistanceFromParent / scale.distance, -θ);
  c.x += origin.x;
  c.y += origin.y;

  return {
    ...body,
    ...c,
    radius: body.radius / scale.size,
  };
};

let start;
let animationFrameRequestId;

export default {
  name: "Planets",
  components: {
    SvgWindow,
  },
  data() {
    return {
      selectedBody: null,
      time: 0.0,
      scale: {
        size: 2000,
        distance: 300000,
        secondsPerYear: 30,
      },
      animationFrameRequestId: null,
    };
  },
  computed: {
    bodies() {
      return bodies.map((b) => {
        let bCalc = adjustRatios(
          b,
          this.time / this.scale.secondsPerYear,
          this.scale
        );
        bCalc.satellites = (bCalc.satellites || []).map((s) =>
          adjustRatios(s, this.time / this.scale.secondsPerYear, this.scale, {
            x: bCalc.x,
            y: bCalc.y,
          })
        );
        return bCalc;
      });
    },
  },
  beforeUnmount() {
    window.cancelAnimationFrame(animationFrameRequestId);
    document.removeEventListener("keydown", this.onkeydown);
  },
  mounted() {
    document.addEventListener("keydown", this.onkeydown);
  },
  methods: {
    togglePlay() {
      if (animationFrameRequestId) {
        window.cancelAnimationFrame(animationFrameRequestId);
        animationFrameRequestId = null;
      } else {
        animationFrameRequestId = window.requestAnimationFrame(this.animate);
      }
    },
    animate(timestamp) {
      if (start === undefined) {
        start = timestamp;
      }

      this.time = (timestamp - start) / 1000.0;

      animationFrameRequestId = window.requestAnimationFrame(this.animate);
    },
    onkeydown(e) {
      switch (e.code) {
        case "Period":
          this.time += 0.1;
          break;
        case "Comma":
          this.time -= 0.1;
          break;
      }
    },
  },
};
</script>

<style scoped>
#svg {
  outline: red solid 1px;
  color: white;
}

.debug {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>