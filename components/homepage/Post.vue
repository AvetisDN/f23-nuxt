<template>
  <div
    class="flex flex-col gap-3 p-5 border border-zinc-300 dark:border-zinc-800 rounded-lg"
  >
    <h3>{{ post.caption }}</h3>
    <div class="flex text-sm gap-3">
      <p>{{ post.user.username }}</p>
      <p>{{ getDateTime(post) }}</p>
    </div>
    <img
      :src="strapiURL + post.photo[0].url"
      :alt="post.caption"
      class="rounded h-[250px] object-cover"
    />
    <div class="flex gap-2 items-center">
      <div class="flex flex-col items-center text-xs">
        <ChatBubbleBottomCenterTextIcon class="h-5" />
        <span>5</span>
      </div>
      <form class="flex gap-2">
        <textarea
          class="form-input resize-none"
          name="comment"
          cols="20"
        ></textarea>
        <button>
          <PaperAirplaneIcon class="h-6" />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import {
  ChatBubbleBottomCenterTextIcon,
  PaperAirplaneIcon,
} from "@heroicons/vue/24/solid";
import moment from "moment";

defineProps(["post"]);

const {
  public: { strapiURL },
} = useRuntimeConfig();

const getDateTime = (post) => {
  if (moment().isSame(moment(post.updatedAt), "d")) {
    return moment(post.updatedAt).fromNow();
  }
  return moment(post.updatedAt).format("DD.MM.YYYY");
};
</script>

<style></style>
