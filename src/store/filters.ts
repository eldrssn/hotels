import { defineStore } from 'pinia';
import { data } from '../data';
import { MAX_PRICE, MIN_PRICE } from '../constants';

interface Hotel {
  name: string;
  country: string;
  stars: number;
  type: string;
  description: string;
  services: string[];
  min_price: number;
  currency: string;
  rating: number;
  reviews_amount: number;
  last_review: string;
  booked: boolean;
}

interface StoreState {
  selectedCountries: string[];
  selectedTypes: string[];
  selectedStars: number[];
  priceRange: [number, number];
  minReviews: number | null;
  hotels: Hotel[];
  filteredHotels: Hotel[];
  currentPage: number;
  itemsPerPage: number;
}

export const useStore = defineStore('store', {
  state: (): StoreState => ({
    selectedCountries: [],
    selectedTypes: [],
    selectedStars: [],
    priceRange: [MIN_PRICE, MAX_PRICE],
    minReviews: null,
    hotels: [],
    filteredHotels: [],
    currentPage: 1,
    itemsPerPage: 3,
  }),

  getters: {
    totalFilteredHotels(): number {
      return this.filteredHotels.length;
    },

    totalPages(): number {
      return Math.ceil(this.filteredHotels.length / this.itemsPerPage);
    },

    paginatedHotels(): Hotel[] {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredHotels.slice(start, end);
    },
  },

  actions: {
    async fetchHotels() {
      try {
        this.hotels = data.map((hotel) => ({
          ...hotel,
          booked: false,
        }));
        this.filteredHotels = [...this.hotels];
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    },

    setPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    resetPagination() {
      this.currentPage = 1;
    },

    toggleBooking(hotelName: string) {
      const hotel = this.hotels.find((h) => h.name === hotelName);
      if (hotel) {
        hotel.booked = !hotel.booked;
      }
    },

    applyFilters() {
      this.filteredHotels = this.hotels.filter((hotel) => {
        let match = true;

        if (this.selectedCountries.length) {
          match = this.selectedCountries.includes(hotel.country);
        }

        if (this.selectedTypes.length) {
          match = match && this.selectedTypes.includes(hotel.type);
        }

        if (this.selectedStars.length) {
          match = match && this.selectedStars.includes(hotel.stars);
        }

        if (this.priceRange) {
          match =
            match &&
            hotel.min_price >= this.priceRange[0] &&
            hotel.min_price <= this.priceRange[1];
        }

        if (this.minReviews !== null) {
          match = match && hotel.reviews_amount >= this.minReviews;
        }

        return match;
      });
    },

    resetFilters() {
      this.selectedCountries = [];
      this.selectedTypes = [];
      this.selectedStars = [];
      this.priceRange = [MIN_PRICE, MAX_PRICE];
      this.minReviews = null;
      this.filteredHotels = [...this.hotels];
      this.resetPagination();
    },
  },
});
