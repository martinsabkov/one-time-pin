import { mount, Wrapper } from '@vue/test-utils';
import OneTimePin from '@/components/OneTimePin.vue';

class OneTimePinComponent extends OneTimePin {}

describe('OneTimePin.vue', () => {
  it('renders an input element for each digit (validationType: "numbers")', () => {
    const numberOfBoxes = 5;
    const validationType = 'numbers';
    const wrapper: Wrapper<OneTimePinComponent> = mount(OneTimePinComponent, {
      propsData: {
        numberOfBoxes,
        validationType,
      },
    });

    const inputElements = wrapper.findAll('input');
    expect(inputElements).toHaveLength(numberOfBoxes);
  });

  it('simulates typing numbers with a length equal to numberOfBoxes', async () => {
    const numberOfBoxes = 5;
    const validationType = 'numbers';
    const wrapper: Wrapper<OneTimePinComponent> = mount(OneTimePinComponent, {
      propsData: {
        numberOfBoxes,
        validationType,
      },
    });

    // Simulate typing numbers with the length equal to numberOfBoxes
    const inputElements = wrapper.findAll('input');
    for (let i = 0; i < numberOfBoxes; i++) {
      await inputElements.at(i).setValue(i.toString());
    }

    // Verify that the component's data contains the typed numbers
    const vm = wrapper.vm as any;
    expect(vm.digits.join('')).toBe('01234');
  });
});
