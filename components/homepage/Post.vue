<template>
  <NuxtLink
    :to="`/post/${post.documentId}`"
    class="flex flex-col gap-3 p-5 border border-zinc-300 dark:border-zinc-800 rounded-lg"
  >
    <h3>{{ post.caption }}</h3>
    <div class="flex text-sm font-bold gap-3">
      <p>{{ post.user.username }}</p>
    </div>
    <img
      :src="strapiURL + post.photo[0].formats.small.url"
      :alt="post.caption"
      class="rounded h-[250px] object-cover"
    />
    <div class="flex gap-2 text-sm items-center justify-between">
      <p>{{ getDateTime(post.updatedAt) }}</p>
      <div class="flex gap-1 items-center text-xs">
        <ChatBubbleBottomCenterTextIcon class="h-5" />
        <span>5</span>
      </div>
      <!-- <form class="flex gap-2">
        <textarea
          class="form-input resize-none"
          name="comment"
          cols="20"
        ></textarea>
        <button>
          <PaperAirplaneIcon class="h-6" />
        </button>
      </form> -->
    </div>
  </NuxtLink>
</template>

<script setup>
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/vue/24/solid";

const props = defineProps(["post"]);

const {
  public: { strapiURL },
} = useRuntimeConfig();
</script>

<style></style>
