<template>
  <div class="page">
    <div class="wrapper">
      <h1>Post {{ docId }}</h1>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const docId = route.params.id;
</script>

<style></style>
