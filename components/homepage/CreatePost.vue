<template>
  <div>
    <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
      <div class="form-control">
        <input
          type="file"
          class="hidden"
          accept=".png, .jpg, .jpeg, .webp"
          multiple
          required
          id="image-input"
          name="files"
          @change="handleFiles"
        />
        <label
          for="image-input"
          class="grow cursor-pointer transition hover:text-emerald-600"
        >
          <div class="flex flex-col items-center gap-2">
            <PlusCircleIcon class="w-10 h-10" />
            <span class="ws-nowrap">Select File(s)</span>
          </div>
        </label>
      </div>
      <div class="form-control flex justify-center gap-2 flex-wrap">
        <img
          v-for="(url, index) in imagesURL"
          :src="url"
          alt=""
          :key="index"
          class="h-16 w-16 object-cover rounded"
        />
      </div>
      <div class="form-control flex justify-center text-xs" v-if="imagesText">
        {{ imagesText }}
      </div>
      <div class="form-control">
        <textarea
          class="form-input resize-none"
          name="caption"
          placeholder="Caption"
          required
          rows="4"
          v-model="caption"
        ></textarea>
      </div>
      <button type="submit" class="btn" :disabled="isLoading">
        {{ isLoading ? "Creating..." : "Add Post" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { PlusCircleIcon } from "@heroicons/vue/24/solid";

const {
  public: { graphqlURL, strapiURL },
} = useRuntimeConfig();

const user = useUser();
const session = useSession();

const isLoading = ref(false);
const data = ref(null);
const error = ref({});

const imagesURL = ref([]);
const images = ref([]);
const imagesText = ref("");
const caption = ref("");

const handleFiles = (event) => {
  images.value = event.target.files;
  const files = Array.from(event.target.files);
  imagesURL.value = [];

  files.forEach((file, index) => {
    imagesURL.value.push(URL.createObjectURL(file));
  });
  const len = imagesURL.value.length;
  imagesText.value = `${len} file${len > 1 ? "s" : ""} selected`;
};

const uploadFiles = async (event) => {
  try {
    const response = await fetch(`${strapiURL}/api/upload`, {
      method: "post",
      body: new FormData(event.target),
      headers: {
        Authorization: `Bearer ${session.value?.data?.jwt}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {}
};

const handleSubmit = async (event) => {
  isLoading.value = true;
  const uploads = await uploadFiles(event);
  console.log(uploads);

  const createPostQuery = {
    query: `
      mutation ($data: PostInput!) {
        createPost(data: $data) {
          documentId
          caption
          photo {
            url
            documentId
          }
          user {
            documentId
            username
          }
          updatedAt
        }
      }
    `,
    variables: {
      data: {
        caption: caption.value,
        user: user.value.id,
        publishedAt: new Date(),
        photo: uploads.map((file) => file.id),
      },
    },
  };

  try {
    const { createPost, errors } = await sendRequest(graphqlURL, {
      body: JSON.stringify(createPostQuery),
      headers: {
        Authorization: `Bearer ${session.value?.data?.jwt}`,
        "Content-Type": "application/json",
      },
    });
    if (errors) {
      throw new Error(errors);
    }
    console.log(createPost);
    refreshNuxtData();
    caption.value = "";
    imagesURL.value = [];
    images.value = [];
    imagesText.value = "";
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};
</script>

<style></style>
