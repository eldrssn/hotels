<template>
  <div>
    <h3 class="type-filter__title">Тип</h3>
    <div class="type-filter">
      <div class="type-filter__list">
        <div
          v-for="option in options"
          :key="option.value"
          class="type-filter__item"
        >
          <Checkbox
            v-model="selectedTypes"
            :value="option.value"
            @change="updateSelectedTypes"
            class="type-filter__checkbox"
          />
          <label class="type-filter__label">{{ option.label }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import Checkbox from 'primevue/checkbox';
import { useStore } from '../../store/filters';
import { TYPES_OPTIONS } from '../../constants';

export default defineComponent({
  name: 'TypeFilter',
  components: { Checkbox },
  setup() {
    const store = useStore();

    const options = ref(TYPES_OPTIONS);

    const selectedTypes = ref<string[]>(store.selectedTypes);

    watch(
      () => store.selectedTypes,
      (newValue) => {
        selectedTypes.value = [...newValue];
      },
      { immediate: true },
    );

    const updateSelectedTypes = () => {
      store.selectedTypes = [...selectedTypes.value];
    };

    return {
      options,
      selectedTypes,
      updateSelectedTypes,
    };
  },
});
</script>

<style scoped>
.type-filter {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background-color: #fafafa;
}

.type-filter__title {
  font-weight: 700;
  font-size: 16px;
  color: #3a3a3a;
  margin-bottom: 13px;
}

.type-filter__list {
  display: flex;
  flex-direction: column;
}

.type-filter__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 0;
  border-bottom: 1px solid #eaeaea;
}

.type-filter__item:last-child {
  border-bottom: none;
}

.type-filter__label {
  font-weight: 400;
  font-size: 16px;
  color: #3a3a3a;
}
</style>
