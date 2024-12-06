<template>
  <div class="country-filter">
    <h3 class="country-filter__title">Страна</h3>
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText v-model="searchTerm" placeholder="Поиск стран" fluid />
    </IconField>
    <div class="country-filter__list">
      <div
        v-for="country in filteredCountries"
        :key="country.name"
        class="country-filter__item"
      >
        <Checkbox
          @change="updateSelectedCountries"
          v-model="selectedCountries"
          :value="country.name"
          class="country-filter__checkbox"
        />
        <label class="country-filter__label">{{ country.name }}</label>
      </div>
      <div v-if="filteredCountries.length === 0" class="country-filter__empty">
        К сожалению, по вашему запросу ничего не найдено :(
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';

import Checkbox from 'primevue/checkbox';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { useStore } from '../../store/filters';
import { COUNTRIES_OPTIONS } from '../../constants';

export default defineComponent({
  name: 'CountryFilter',
  components: { Checkbox, IconField, InputIcon, InputText },
  setup() {
    const store = useStore();

    const countries = ref(COUNTRIES_OPTIONS);

    const searchTerm = ref('');

    const filteredCountries = computed(() => {
      return countries.value.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.value.toLowerCase()),
      );
    });

    const selectedCountries = ref(store.selectedCountries);

    watch(selectedCountries, (newValue) => {
      store.selectedCountries = newValue;
    });

    watch(
      () => store.selectedTypes,
      (newValue) => {
        selectedCountries.value = [...newValue];
      },
      { immediate: true },
    );

    const updateSelectedCountries = () => {
      store.selectedCountries = [...selectedCountries.value];
    };

    return {
      countries,
      searchTerm,
      selectedCountries,
      filteredCountries,
      updateSelectedCountries,
    };
  },
});
</script>

<style scoped>
.country-filter {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.country-filter__title {
  font-size: 16px;
  font-weight: bold;
}

.country-filter__list {
  height: 80px;
  max-height: 80px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  background-color: #fff;
}

.country-filter__item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.country-filter__checkbox {
  margin-right: 10px;
}

.country-filter__label {
  font-size: 14px;
  color: #333;
}

.country-filter__empty {
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #868686;
  display: grid;
  place-content: center;
  height: 100%;
}
</style>
