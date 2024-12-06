<template>
  <div class="pagination-container" v-if="store.filteredHotels.length > 0">
    <Paginator
      :rows="store.itemsPerPage"
      :totalRecords="store.filteredHotels.length"
      :first="(store.currentPage - 1) * store.itemsPerPage"
      @page="onPageChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Paginator from 'primevue/paginator';
import { useStore } from '../store/filters';

export default defineComponent({
  name: 'Pagination',
  components: { Paginator },
  setup() {
    const store = useStore();

    const onPageChange = (event: { page: number }) => {
      store.setPage(event.page + 1);
    };

    return {
      store,
      onPageChange,
    };
  },
});
</script>

<style scoped>
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
