<template>
  <div class="page">
    <div class="wrapper">
      <h1>Hello, {{ user?.username || "Guest" }}</h1>
      <div class="divider"></div>
      <div class="flex flex-col md:flex-row gap-5 relative items-start">
        <div class="grow flex flex-col gap-5">
          <h2>Latest Posts</h2>
          <div v-if="data?.nodes.length > 0" class="grid lg:grid-cols-2 gap-4">
            <HomepagePost v-for="post in data?.nodes" :post="post" />
          </div>
          <Pagination :pagination="data?.pageInfo" />
        </div>
        <div class="min-w-[300px] -order-1 md:order-1 sticky top-20">
          <h3>Create new post</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  public: { graphqlURL, strapiURL },
} = useRuntimeConfig();

const session = useSession();
const user = useUser();

const isLoading = ref(false);

const fetchPosts = async (page) => {
  const postsQuery = {
    query: `
      query Posts($page: Int, $pageSize: Int) {
        posts_connection(pagination: {page: $page, pageSize: $pageSize}, sort: "updatedAt:desc") {
          nodes {
            caption
            documentId
            updatedAt
            photo {
              url
            }
            user {
              username
            }
          }
          pageInfo {
            total
            pageSize
            page
            pageCount
          }
        }
      }
    `,
    variables: {
      page: +page,
      pageSize: 2,
    },
  };
  try {
    let { posts_connection, errors } = await sendRequest(graphqlURL, {
      body: JSON.stringify(postsQuery),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (errors) {
      throw new Error(errors);
    }
    return posts_connection;
  } catch (error) {
    console.error(error);
  }
};

const { data } = await useAsyncData("posts", async ({ _route: { query } }) => {
  let { page } = query;
  return await fetchPosts(page || 1);
});
</script>

<style></style>
