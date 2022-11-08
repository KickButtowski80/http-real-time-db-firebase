<template>
  <learning-survey @add-new-survey="addNewSurvey"></learning-survey>
  <user-experiences
    :isLoading="isLoading"
    @send-id-4-del="delSurvey"
  ></user-experiences>
</template>

<script>
import LearningSurvey from "./components/survey/LearningSurvey.vue";
import UserExperiences from "./components/survey/UserExperiences.vue";
import { readDB } from "./firebase.js";
export default {
  components: {
    LearningSurvey,
    UserExperiences,
  },
  provide() {
    return {
      results: this.results,
    };
  },
  data() {
    return {
      results: [],
      isLoading: false,
    };
  },
  async mounted() {
    this.isLoading = true;
    let response = await readDB(
      "https://vue-http-sample-demo-default-rtdb.firebaseio.com/surveys.json"
    );
    if (response.ok) {
      this.isLoading = false;
      let data = await response.json();

      if (!data) {
        console.log("the db is empty");
        return;
      }
      Object.entries(data).map((k) => {
        console.log(data);
        const obj = {
          id: k[0],
          name: k[1].name,
          rating: k[1].rating,
        };
        this.results.unshift(obj);
      });
    } else {
      console.log(response);
    }
  },

  methods: {
    addNewSurvey(event) {
      this.results.unshift(event);
    },
    async delSurvey(id) {
      const desiredDelId = this.results.findIndex((s) => s.id === id);
      this.results.splice(desiredDelId, 1);
      await fetch(
        "https://vue-http-sample-demo-default-rtdb.firebaseio.com/surveys/" +
          id +
          ".json",
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, Content-Type, X-Auth-Token",
            "Access-Control-Allow-Methods":
              "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          },
        }
      );
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>