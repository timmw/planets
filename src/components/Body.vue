<template>
  <!-- Body outline -->
  <circle
    v-if="drawOutline"
    :key="body.name + '-outline'"
    :cx="body.x"
    :cy="body.y"
    :r="outlineRadius"
    fill="none"
    stroke="grey"
    :stroke-width="outlineWidth"
    stroke-opacity="0.6"
  />
  <!-- The orbit path -->
  <circle
    v-if="drawPath"
    :key="body.name + '-path'"
    :cx="parentBody.x"
    :cy="parentBody.y"
    :r="body.avgDistanceFromParent"
    fill="none"
    stroke="grey"
    stroke-opacity="0.3"
    :stroke-width="pathWidth"
  />
  <!-- The body -->
  <circle
    :key="body.name"
    :cx="body.x"
    :cy="body.y"
    :r="body.radius"
    :fill="body.color"
  >
    <title>{{ body.name }}</title>
  </circle>
</template>
<script>
export default {
  props: {
    body: {
      type: Object,
      required: true
    },
    parentBody: {
      type: Object,
      required: true
    },
    drawPath: {
      type: Boolean,
      required: true
    },
    drawOutline: {
      type: Boolean,
      required: true
    },
    pathWidth: {
      type: Number,
      default: null
    },
    outlineRadius: {
      type: Number,
      default: null
    },
    outlineWidth: {
      type: Number,
      default: null
    }
  },
};
</script>