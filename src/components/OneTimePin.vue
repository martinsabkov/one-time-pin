<template>
  <div class="digits-input-wrapper" @paste="handlePaste($event)">
    <!-- Loop through digits and create input elements -->
    <input
      v-for="(digit, index) in digits"
      :key="index"
      :type="isMasked ? 'password' : 'text'"
      v-model="digits[index]"
      @keydown="handleKeyDown(index, $event)"
      @input="handleInput(index, $event.target.value)"
      @click="currentBox = index"
      :maxlength="1"
      class="digit-input-box"
      :class="{ focused: currentBox === index }"
      :ref="'digitInput' + index"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    numberOfBoxes: Number,
    validationType: {
      type: String,
      default: 'numbers',
    },
    defaultValue: {
      type: [Number, String],
      default: null,
    },
    isMasked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // Initialize an array to store digit values and set the currentBox
      digits: new Array<string>(this.numberOfBoxes).fill(''),
      currentBox: 0,
    };
  },
  beforeMount() {
    this.prefillDefaultValue();
  },
  mounted() {
    // Auto focus the first input box after the component is mounted
    this.$nextTick(() => {
      const firstInput = this.$refs['digitInput0'] as HTMLInputElement;
      if (firstInput) {
        firstInput.focus();
      }
    });
  },
  computed: {
    regexPattern(): RegExp {
      // Define regex patterns based on validationType prop
      switch (this.validationType) {
        case 'numbers':
          return /^[0-9]+$/; // Matches numbers only
        case 'letters':
          return /^[A-Za-z]+$/; // Matches letters only
        case 'mix':
          return /^[A-Za-z0-9]+$/; // Matches a combination of letters and numbers

        // (optional) Add more cases

        default:
          return /^[0-9]+$/; // Handle fallback value (numbers only)
      }
    },
  },
  methods: {
    prefillDefaultValue() {
      if (this.defaultValue) {
        const characters = this.defaultValue.toString().split('');
        characters.forEach((char, index) => {
          if (index < this.numberOfBoxes) {
            if (this.regexPattern.test(char)) {
              this.digits[index] = char;
              this.moveFocus(index);
            }
          }
        });
      }
    },
    findIndexOfEmptyStringAfterIndex(arr: string[], startIndex: number) {
      // Find the index of the first empty string after the selected index
      for (let i = startIndex + 1; i < arr.length; i++) {
        if (arr[i] === '') {
          return i;
        }
      }
      return -1; // Return -1 if no empty string is found after the selected index
    },
    handleInput(index: number, value: string | number) {
      const enteredValue = String(value);
      if (this.regexPattern.test(enteredValue)) {
        this.digits[index] = ''; // Clear the input before setting a valid value

        // Trigger a reactivity update
        this.$forceUpdate();

        this.digits[index] = enteredValue; // Set the valid value
        this.moveFocus(index, 'forward'); // Move focus to the next input box
        this.checkIfAllBoxesFilled();
      } else {
        this.digits[index] = '';
      }
    },
    handleKeyDown(index: number, event: KeyboardEvent) {
      if (event.key === 'Backspace' && this.digits[index] === '') {
        if (index > 0) {
          this.digits[index] = ''; // Clear the current input
          this.moveFocus(index, 'backward'); // Move focus to the previous box
        }
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault(); // Prevent the default left arrow behavior (caret movement)

        if (index > 0) {
          this.moveFocus(index, 'backward'); // Move to the previous box
        }
      } else if (event.key === 'ArrowRight') {
        event.preventDefault(); // Prevent the default right arrow behavior (caret movement)

        if (index < this.numberOfBoxes - 1) {
          this.moveFocus(index, 'forward'); // Move to the next box
        }
      } else {
        if (this.digits[index] !== '') {
          if (
            event.key === 'Backspace' ||
            event.key === ' ' ||
            event.key === 'Alt'
            // Added conditions for keys to filter
          ) {
            return;
          } else {
            this.handleInput(index, event.key); // Handle input if a key is pressed
          }
        }
      }
    },
    moveFocus(index: number, type: 'forward' | 'backward' = 'forward') {
      const validNumberOfBoxes =
        type === 'forward' ? this.numberOfBoxes - 1 : this.numberOfBoxes;

      if (index < validNumberOfBoxes) {
        const goToIndex = type === 'forward' ? index + 1 : index - 1;
        const nextAvailableIndex = this.findIndexOfEmptyStringAfterIndex(
          this.digits,
          index
        );

        const firstInput = this.$refs[
          `digitInput${
            nextAvailableIndex !== -1 && type === 'forward'
              ? nextAvailableIndex
              : goToIndex
          }`
        ] as HTMLInputElement;

        if (nextAvailableIndex !== -1 && type === 'forward') {
          this.currentBox = nextAvailableIndex;

          if (firstInput) {
            firstInput.focus();
          }
        } else {
          this.currentBox = goToIndex;
          if (firstInput) {
            firstInput.focus(); // Move focus to the next input
          }
        }
      }
    },
    handlePaste(event: ClipboardEvent) {
      event.preventDefault();

      if (event.clipboardData) {
        const pastedText = event.clipboardData.getData('text');
        const characters = pastedText.split('');

        characters.forEach((char, index) => {
          if (index < this.numberOfBoxes) {
            if (this.regexPattern.test(char)) {
              this.digits[index] = char;
              this.moveFocus(index);
            }
          }
        });
      }
    },
    checkIfAllBoxesFilled() {
      if (this.digits.every((digit) => this.regexPattern.test(digit))) {
        this.$emit('completed', {
          raw: JSON.parse(JSON.stringify(this.digits)), // Deep clone
          extracted: this.digits.join(''),
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.one-time-pin-container {
  display: flex;
  flex-direction: column;
}
.digits-input-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  margin: 15px 0 10px;
}
.digit-input-box {
  width: 30px;
  height: 30px;
  text-align: center;
  font-size: 18px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  caret-color: transparent; /* Hide the blinking cursor */
  &.focused {
    border-color: #6743c1;
  }
}
</style>
