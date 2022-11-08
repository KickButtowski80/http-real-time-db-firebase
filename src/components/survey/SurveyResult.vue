<template>
  <li>
    <p>
      <span class="highlight">{{ name }}</span> rated the learning experience
      <span :class="ratingClass">{{ rating }}</span
      >.
      <span><base-button @click="delSurvey">del</base-button></span>
    </p>
  </li>
</template>
<script>
export default {
  props: {
    id: String,
    name: String,
    rating: String,
  },
  emits: ["sendId4Del"],
  computed: {
    ratingClass() {
      return "highlight rating--" + this.rating;
    },
  },
  methods: {
    async delSurvey() {
      this.$emit("sendId4Del", this.id);
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

h3,
p {
  font-size: 1rem;
  margin: 0.5rem 0;
}

.highlight {
  font-weight: bold;
}

.rating--poor {
  color: #b80056;
}

.rating--average {
  color: #330075;
}

.rating--great {
  color: #008327;
}
</style>