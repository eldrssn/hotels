<template>
  <main class="app-container">
    <div class="filter-container">
      <FilterPanel />
    </div>
    <div class="content-container">
      <HotelList />
      <Pagination />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import FilterPanel from './components/FilterPanel.vue';
import HotelList from './components/HotelList.vue';
import Pagination from './components/Pagination.vue';
import { useStore } from './store/filters';

export default defineComponent({
  name: 'App',
  components: {
    FilterPanel,
    HotelList,
    Pagination,
  },
  setup() {
    const { fetchHotels } = useStore();

    onMounted(async () => {
      await fetchHotels();
    });
  },
});
</script>

<style scoped>
.app-container {
  display: flex;
  margin: 50px auto;
  gap: 20px;
  max-width: 1264px;
  padding: 0 16px;
}
.filter-container {
  width: 325px;
}
.content-container {
  flex-grow: 1;
}
</style>
