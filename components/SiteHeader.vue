<template>
  <header
    class="bg-emerald-600 text-gray-50 dark:bg-zinc-900 dark:text-emerald-400 p-4 lg:p-5 !py-4 sticky top-0"
  >
    <div class="container mx-auto flex gap-4 items-center">
      <HeaderLogo />
      <nav class="ml-auto flex items-center gap-1">
        <NuxtLink class="nav-link" to="/">Home</NuxtLink>
        <NuxtLink v-if="!session.data" class="nav-link" to="/auth/register">
          Register
        </NuxtLink>
        <NuxtLink v-if="!session.data" class="nav-link" to="/auth/login">
          Login
        </NuxtLink>
      </nav>
      <button
        v-if="session.data"
        class="btn-danger btn-sm"
        @click="handleLogout"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup>
const session = useSession();

function handleLogout() {
  useSetSession(null);
  navigateTo("/");
}
</script>

<style></style>
