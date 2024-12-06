<template>
  <div class="filter-panel">
    <CountryFilter />
    <TypeFilter />
    <StarFilter />
    <ReviewsFilter />
    <PriceFilter />
    <div class="filter-panel__buttons">
      <Button label="Применить фильтры" @click="applyFilters" />
      <Button
        label="Сбросить фильтры"
        @click="resetFilters"
        class="p-button-secondary"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../store/filters';
import Button from 'primevue/button';
import TypeFilter from './filters/TypeFilter.vue';
import StarFilter from './filters/StarFilter.vue';
import ReviewsFilter from './filters/ReviewsFilter.vue';
import PriceFilter from './filters/PriceFilter.vue';
import CountryFilter from './filters/CountryFilter.vue';

export default defineComponent({
  name: 'FilterPanel',
  components: {
    CountryFilter,
    TypeFilter,
    StarFilter,
    ReviewsFilter,
    Button,
    PriceFilter,
  },
  setup() {
    const { resetFilters, applyFilters } = useStore();

    return {
      applyFilters,
      resetFilters,
    };
  },
});
</script>

<style scoped>
.filter-panel {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 325px;
}
.filter-panel__buttons {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
