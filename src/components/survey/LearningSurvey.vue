<template>
  <section>
    <base-card>
      <h2>How was you learning experience?</h2>
      <form @submit.prevent="submitSurvey">
        <div class="form-control">
          <label for="name">Your Name:</label>
          <input type="text" id="name" name="name" v-model.trim="enteredName" />
        </div>
        <h3>My learning experience was ...</h3>
        <div class="form-col">
          <div class="form-control">
            <input
              type="radio"
              id="rating-poor"
              value="poor"
              name="rating"
              v-model="chosenRating"
            />
            <label for="rating-poor">Poor</label>
          </div>
          <div class="form-control">
            <input
              type="radio"
              id="rating-average"
              value="average"
              name="rating"
              v-model="chosenRating"
            />
            <label for="rating-average">Average</label>
          </div>
          <div class="form-control">
            <input
              type="radio"
              id="rating-great"
              value="great"
              name="rating"
              v-model="chosenRating"
            />
            <label for="rating-great">Great</label>
          </div>
        </div>
        <p v-if="invalidInput">
          One or more input fields are invalid. Please check your provided data.
        </p>
        <p>{{error}}</p>
        <div>
          <base-button>Submit</base-button>
        </div>
      </form>
    </base-card>
  </section>
</template>

<script>
export default {
  emits: ["add-new-survey"],
  data() {
    return {
      enteredName: "",
      chosenRating: null,
      invalidInput: false,
      userExperience: [],
      error: '',
    };
  },

  methods: {
    async submitSurvey() {
      if (this.enteredName === "" || !this.chosenRating) {
        this.invalidInput = true;
        return;
      }
      this.invalidInput = false;
      try {
        const respons = await fetch(
          "https://vue-http-sample-demo-default-rtdb.firebaseio.com/surveys.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.enteredName,
              rating: this.chosenRating,
            }),
          }
        );
        if (respons.ok) {
          const id = await respons.json();
          this.$emit("add-new-survey", {
            id: id.name,
            name: this.enteredName,
            rating: this.chosenRating,
          });
          this.enteredName = "";
          this.chosenRating = null;
        } else {
          throw new Error("Could not save data!");
        }
      } catch (error) {
        this.error = error.message
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
}

.form-col {
  display: flex;
  border-block: 1px solid black;
  margin-bottom: 1rem;
  padding: 1rem;
}

input[type="text"] {
  display: flex;
  flex-basis: 320px;
  flex-grow: 1;
  flex-shrink: 2;
}
</style>