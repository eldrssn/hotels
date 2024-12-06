<template>
  <div class="price-filter">
    <h3 class="price-filter__title">Цена</h3>
    <div class="price-filter__inputs">
      <InputNumber
        v-model="priceRange[0]"
        :min="minValue"
        :max="priceRange[1]"
        placeholder="от 0 ₽"
        :step="100"
        mode="currency"
        currency="RUB"
        locale="ru-RU"
        @change="updateStore"
        fluid
      />
      <span class="price-filter__separator">—</span>
      <InputNumber
        v-model="priceRange[1]"
        :min="priceRange[0]"
        :max="maxValue"
        placeholder="до 100 500 ₽"
        :step="100"
        mode="currency"
        currency="RUB"
        locale="ru-RU"
        @change="updateStore"
        fluid
      />
    </div>
    <Slider
      v-model="priceRange"
      :min="minValue"
      :max="maxValue"
      :step="100"
      :range="true"
      class="price-filter__slider"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import InputNumber from 'primevue/inputnumber';
import Slider from 'primevue/slider';
import { useStore } from '../../store/filters';
import { MAX_PRICE, MIN_PRICE } from '../../constants';

export default defineComponent({
  name: 'PriceFilter',
  components: { InputNumber, Slider },
  setup() {
    const store = useStore();

    const minValue = MIN_PRICE;
    const maxValue = MAX_PRICE;

    const priceRange = ref<[number, number]>(store.priceRange);

    watch(priceRange, (newValue) => {
      store.priceRange = [...newValue];
    });

    watch(
      () => store.priceRange,
      (newValue) => {
        if (
          newValue[0] !== priceRange.value[0] ||
          newValue[1] !== priceRange.value[1]
        ) {
          priceRange.value = [...newValue];
        }
      },
      { immediate: true },
    );

    const updateStore = () => {
      store.priceRange = [...priceRange.value];
    };

    return {
      minValue,
      maxValue,
      priceRange,
      updateStore,
    };
  },
});
</script>

<style scoped>
.price-filter {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.price-filter__title {
  font-weight: 700;
  font-size: 16px;
  color: #3a3a3a;
}

.price-filter__inputs {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
}

.price-filter__separator {
  font-size: 16px;
  color: #3a3a3a;
}

.price-filter__slider {
  margin-top: 10px;
}
</style>
