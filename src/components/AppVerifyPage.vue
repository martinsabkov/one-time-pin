<template>
  <div class="digits-container">
    <OneTimePin
      :number-of-boxes="numberOfBoxes"
      :validation-type="pinType"
      :is-masked="hidePin"
      :default-value="defaultValue"
      @completed="completed"
    />
    <label>
      <input v-model="hidePin" type="checkbox" class="toggle-checkbox" />
      Mask Input
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import OneTimePin from './OneTimePin.vue';

@Component({
  components: {
    OneTimePin,
  },
})
export default class AppVerifyPage extends Vue {
  numberOfBoxes: number = 5; // Set the number of input boxes dynamically here
  hidePin: boolean = false; // Set the state of OneTimePin dynamically here
  pinType: string = 'numbers'; // Set the validation type that is predefined (inside OneTimePin.vue) as regex pattern - numbers | letters | mix
  defaultValue: any = null; // (optional) Set default value

  completed(pin: any) {
    console.log('All boxes are filled.', pin);
    setTimeout(() => {
      alert(`All boxes are filled.\nThe entered pin is: ${pin.extracted}`);
    }, 10);
    // You can perform any further actions here.
  }
}
</script>
