<template>
  <div class="list">
    <article
      v-for="hotel in store.paginatedHotels"
      :key="hotel.name"
      class="card"
    >
      <div class="card__content">
        <div class="card__info">
          <h3 class="card__title">{{ hotel.name }}</h3>
          <div class="card__details">
            <Rating :stars="5" v-model="hotel.stars" readonly />
            <p class="card__type">{{ hotel.type }}</p>
            <p class="card__type">{{ hotel.stars }}</p>

            <p class="card__reviews">{{ hotel.reviews_amount }} отзыва</p>
            <p class="card__location">
              {{ hotel.country }}
            </p>
          </div>
        </div>
        <p class="card__description">{{ hotel.description }}</p>
      </div>
      <div class="card__footer">
        <div class="card__price">
          <span class="card__price-value">{{ hotel.min_price }} ₽</span>
          <span class="card__price-info">Цена за 1 ночь</span>
        </div>
        <Button
          :label="hotel.booked ? 'Забронировано' : 'Забронировать'"
          :severity="hotel.booked ? 'success' : 'info'"
          @click="toggleBooking(hotel.name)"
        />
      </div>
    </article>
    <p v-if="store.paginatedHotels.length === 0" class="list__empty">
      Отели не найдены. Попробуйте изменить параметры фильтра.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../store/filters';
import Button from 'primevue/button';
import Rating from 'primevue/rating';

export default defineComponent({
  name: 'HotelList',
  components: { Button, Rating },
  setup() {
    const store = useStore();

    const toggleBooking = (hotelName: string) => {
      console.log('store', store.filteredHotels);

      store.toggleBooking(hotelName);
    };

    return { store, toggleBooking };
  },
});
</script>

<style scoped>
.card {
  border-radius: 15px;
  border: 1px solid #eaeaea;
  padding: 25px;
  margin-bottom: 20px;
  display: flex;
  gap: 46px;
}

.card__content {
  flex-grow: 1;
}
.card__info {
  display: flex;
  flex-direction: column;
}

.card__title {
  font-weight: 700;
  font-size: 20px;
  color: #3a3a3a;
  margin-bottom: 6px;
}

.card__details {
  display: flex;
  gap: 15px;
  margin-bottom: 16px;
  /* cursor: auto; */
}

.card__type {
  font-weight: 400;
  font-size: 14px;
  color: #868686;
}

.card__reviews {
  font-weight: 400;
  font-size: 14px;
  color: #868686;
}

.card__location {
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #3a3a3a;
}

.card__description {
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #3a3a3a;
}

.card__footer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card__price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.card__price-value {
  font-weight: 700;
  font-size: 25px;
  text-align: right;
  color: #3a3a3a;
}
.card__price-info {
  font-weight: 400;
  font-size: 12px;
  color: #868686;
}

.list__empty {
  text-align: center;
  font-size: 18px;
  color: #868686;
  margin-top: 20px;
}
</style>
