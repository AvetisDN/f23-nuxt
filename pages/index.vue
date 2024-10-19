<template>
  <div class="page">
    <div class="wrapper">
      <h1>Hello, {{ user?.username || "Guest" }}</h1>
    </div>
  </div>
</template>

<script setup>
const user = useUser();
</script>

<style></style>
