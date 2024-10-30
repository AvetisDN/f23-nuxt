<template>
  <div class="page">
    <div class="wrapper flex flex-col gap-5">
      <h3>{{ data?.caption }}</h3>
      <div class="flex gap-4">
        <div>{{ data?.user.username }}</div>
        <div>{{ getDateTime(data?.updatedAt) }}</div>
      </div>
      <div class="relative">
        <img
          :src="`${strapiURL}${bigImg}`"
          :alt="data?.caption"
          class="rounded"
        />
        <a
          :href="`${strapiURL}${originalImg}`"
          target="_blank"
          class="absolute top-2 right-2 bg-zinc-900 text-zinc-50 rounded-full w-10 h-10 flex items-center justify-center"
        >
          <MagnifyingGlassPlusIcon class="w-6 h-6" />
        </a>
      </div>
      <div v-if="imagesData.length > 1" class="flex gap-5 flex-wrap p-1">
        <img
          v-for="(photo, index) in imagesData"
          :src="`${strapiURL}${photo.formats.thumbnail.url}`"
          :alt="data?.caption"
          :class="{
            'img-current': index === currentIndex,
          }"
          class="rounded cursor-pointer"
          @click="currentIndex = index"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { MagnifyingGlassPlusIcon } from "@heroicons/vue/24/solid";

const {
  public: { graphqlURL, strapiURL },
} = useRuntimeConfig();

const route = useRoute();
const docId = route.params.id;

const session = useSession();
const user = useUser();

const imagesData = useState("imagesData", () => []);

const currentIndex = ref(0);
const bigImg = computed(
  () => imagesData.value[currentIndex.value]?.formats.large.url
);
const originalImg = computed(() => imagesData.value[currentIndex.value]?.url);

const fetchPost = async (id) => {
  const postQuery = {
    query: `
      query($documentId: ID!) {
        post(documentId: $documentId) {
          photo {
            url
            formats
          }
          caption
          user {
            username
          }
          updatedAt
          comments {
            content
            users_permissions_user {
              username
            }
            updatedAt
          }
        }
      }
    `,
    variables: {
      documentId: id,
    },
  };
  try {
    let { post, errors } = await sendRequest(graphqlURL, {
      body: JSON.stringify(postQuery),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (errors) {
      throw new Error(errors);
    }
    imagesData.value = post.photo;
    return post;
  } catch (error) {
    console.error(error);
  }
};

const { data } = await useAsyncData("post", async () => {
  return await fetchPost(docId);
});
</script>

<style scoped>
.img-current {
  @apply ring-4 ring-emerald-500;
}
</style>
