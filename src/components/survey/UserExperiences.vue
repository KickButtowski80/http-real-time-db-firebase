<template>
  <section>
    <base-card>
      <div class="center">
        <h2>Submitted Experiences</h2>
        <div v-if="isLoading" class="loader"></div>
        <div v-if="!isLoading && (!results || results.length === 0)">
          <p>
            No stored expericneces found. Please add some survey results first
          </p>
        </div>
      </div>
      <ul v-if="!isLoading && results && Object.keys(this.results).length > 0">
        <survey-result
          v-for="result in results"
          v-bind:="{ id: result.id, name: result.name, rating: result.rating }"
          :key="result.id"
          @send-id-4-del="delId"
        >
        </survey-result>
      </ul>
      <div
        v-else-if="!results && Object.keys(this.results).length < 0"
        class="center"
      >
        <p>Please add an expericnece</p>
      </div>
    </base-card>
  </section>
</template>

<script>
import SurveyResult from "./SurveyResult.vue";

export default {
  emits: ["send-id-4-del"],
  props: ["isLoading"],
  inject: ["results"],
  components: {
    SurveyResult,
  },
  methods: {
    delId(id) {
      this.$emit("send-id-4-del", id);
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>