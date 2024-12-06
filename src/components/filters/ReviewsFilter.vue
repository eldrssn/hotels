<template>
  <div>
    <h3 class="reviews-filter__title">Количество отзывов (от)</h3>
    <InputNumber
      v-model="minReviews"
      placeholder="Например, от 10"
      :min="0"
      :max="1000"
      :step="1"
      mode="decimal"
      fluid
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import InputNumber from 'primevue/inputnumber';
import { useStore } from '../../store/filters';

export default defineComponent({
  name: 'ReviewsFilter',
  components: { InputNumber },
  setup() {
    const store = useStore();

    const minReviews = ref<number | null>(store.minReviews || null);

    watch(
      () => store.minReviews,
      (newValue) => {
        minReviews.value = newValue;
      },
    );

    watch(minReviews, (newValue) => {
      store.minReviews = newValue;
    });

    return {
      minReviews,
    };
  },
});
</script>

<style scoped>
.reviews-filter__title {
  font-weight: 700;
  font-size: 16px;
  color: #3a3a3a;
  margin-bottom: 15px;
}
</style>
