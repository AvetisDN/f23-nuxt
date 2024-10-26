<template>
  <div class="pagination">
    <button
      @click="handleClick(`/?page=${getPagination(pagination).prev}`)"
      class="pagination-link mr-3"
    >
      <ChevronLeftIcon class="h-4 -translate-x-px" />
    </button>
    <button
      class="pagination-link"
      :class="{ active: pagination.page === n }"
      v-for="n in pagination.pageCount"
      @click="handleClick(`/?page=${n}`)"
    >
      {{ n }}
    </button>
    <button
      @click="handleClick(`/?page=${getPagination(pagination).next}`)"
      class="pagination-link ml-3"
    >
      <ChevronRightIcon class="h-4" />
    </button>
  </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
defineProps(["pagination"]);

const getPagination = (pagination) => {
  let prev = pagination.page > 1 ? pagination.page - 1 : 1;
  let next =
    pagination.page < pagination.pageCount
      ? pagination.page + 1
      : pagination.pageCount;
  return { prev, next };
};

const handleClick = (path) => {
  navigateTo(path);
  refreshNuxtData();
};
</script>

<style></style>
