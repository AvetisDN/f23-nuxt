<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Nuxt App",
  meta: [{ name: "description", content: "Nuxt 3 app" }],
});

const router = useRouter();
const session = useSession();

onMounted(() => {
  useSetSession(JSON.parse(localStorage.getItem("session")));

  router.beforeEach((to, from) => {
    if (
      (to.path === "/auth/register" || to.path === "/auth/login") &&
      session.value?.data
    ) {
      return false;
    }
  });
});
</script>
