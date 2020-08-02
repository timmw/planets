<template>
  <div>
    <p v-if="selectedBody">{{ selectedBody.name }}</p>
    <SvgWindow id="svg" :width="1600" :height="800">
      <circle
        v-for="body in bodies"
        :key="body.name"
        :cx="body.x"
        :cy="body.y"
        :r="body.radius"
        :fill="body.color"
        @click="selectedBody = body"
      >
        <title>{{ body.name }}</title>
      </circle>
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
const bodies = [
  {
    name: "Sun",
    color: "yellow",
    radius: 696340 / 3, // sun is 1 third size because it's too darn big
    avgDistanceFromSun: 0,
    orbitalPeriod: 0.0,
  },
  {
    name: "Mercury",
    color: "grey",
    radius: 2439,
    avgDistanceFromSun: 46962000,
    orbitalPeriod: 0.241095,
  },
  {
    name: "Venus",
    color: "white",
    radius: 6052,
    avgDistanceFromSun: 108810000,
    orbitalPeriod: 0.616438,
  },
  {
    name: "Earth",
    color: "blue",
    radius: 6371,
    avgDistanceFromSun: 151830000,
    orbitalPeriod: 1.0,
  },
  {
    name: "Mars",
    color: "red",
    radius: 3390,
    avgDistanceFromSun: 207880000,
    orbitalPeriod: 1.882191,
  },
  {
    name: "Jupiter",
    color: "orange",
    radius: 69911,
    avgDistanceFromSun: 770790000,
    orbitalPeriod: 11.865753,
  },
  {
    name: "Saturn",
    color: "gold",
    radius: 58232,
    avgDistanceFromSun: 1494600000,
    orbitalPeriod: 29.443835,
  },
  {
    name: "Uranus",
    color: "lightblue",
    radius: 25326,
    avgDistanceFromSun: 2960700000,
    orbitalPeriod: 83.805479,
  },
  {
    name: "Neptune",
    color: "mediumblue",
    radius: 24622,
    avgDistanceFromSun: 4476500000,
    orbitalPeriod: 163.835616,
  },
];

const coords = (hyp, θ) => ({
  x: Math.cos(θ) * hyp,
  y: Math.sin(θ) * hyp,
});

const adjustRatios = (body, t, scale) => {
  const θ =
    body.orbitalPeriod > 0 ? t * ((2 * Math.PI) / body.orbitalPeriod) : 0;

  return {
    ...body,
    ...coords(body.avgDistanceFromSun / scale.distance, -θ),
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
      return bodies.map((b) =>
        adjustRatios(b, this.time / this.scale.secondsPerYear, this.scale)
      );
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