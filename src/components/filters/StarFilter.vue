<template>
  <div>
    <h3 class="star-filter__title">Количество звезд</h3>
    <div class="star-filter">
      <div class="star-filter__list">
        <div
          v-for="option in options"
          :key="option.value"
          class="star-filter__item"
        >
          <Checkbox
            v-model="selectedStars"
            :value="option.value"
            @change="updateSelectedStars"
            class="star-filter__checkbox"
          />
          <label class="star-filter__label">{{ option.label }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import Checkbox from 'primevue/checkbox';
import { useStore } from '../../store/filters';
import { RATING_OPTIONS } from '../../constants';

export default defineComponent({
  name: 'StarFilter',
  components: { Checkbox },
  setup() {
    const store = useStore();

    const options = ref(RATING_OPTIONS);

    const selectedStars = ref<number[]>(store.selectedStars);

    watch(
      () => store.selectedStars,
      (newValue) => {
        selectedStars.value = [...newValue];
      },
      { immediate: true },
    );

    const updateSelectedStars = () => {
      store.selectedStars = [...selectedStars.value];
    };

    return {
      options,
      selectedStars,
      updateSelectedStars,
    };
  },
});
</script>

<style scoped>
.star-filter {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
}

.star-filter__title {
  font-weight: 700;
  font-size: 16px;
  color: #3a3a3a;
  margin-bottom: 13px;
}

.star-filter__list {
  display: flex;
  flex-direction: column;
}

.star-filter__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
}

.star-filter__item:last-child {
  border-bottom: none;
}

.star-filter__label {
  font-weight: 400;
  font-size: 16px;
  color: #3a3a3a;
}
</style>
