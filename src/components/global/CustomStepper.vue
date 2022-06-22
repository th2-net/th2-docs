<template>
  <v-stepper :value="step" style="background-color: rgba(0,0,0,0)" elevation="0">
    <v-stepper-header>
      <v-stepper-step v-for="s in stepsArray" :key="s"
                      :complete="step > s"
                      :step="s">
      </v-stepper-step>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
export default {
  name: "CustomStepper",
  props: {
    steps: Number,
    step: Number
  },
  computed: {
    stepsArray(){
      let steps = []
      for (let i = 0; i < this.steps; i++) {
        steps.push(i + 1)
      }
      return steps
    }
  }
}
</script>

<style scoped>

</style>
