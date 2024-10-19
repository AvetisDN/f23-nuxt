<template>
  <div class="page page-register">
    <div class="wrapper">
      <form
        class="form-container"
        @submit.prevent="handleLogin"
        autocomplete="off"
      >
        <div class="form-header">
          <h2>Sign In</h2>
        </div>
        <div class="form-wrapper">
          <div class="form-control">
            <label for="identifier">Name or Email</label>
            <input
              require
              id="identifier"
              type="text"
              class="form-input"
              v-model="identifier"
            />
          </div>
          <div class="form-control">
            <label for="password">Password</label>
            <input
              required
              minlength="6"
              id="password"
              type="password"
              class="form-input"
              v-model="password"
            />
          </div>
        </div>
        <div class="form-footer">
          <button
            type="submit"
            class="btn"
            :disabled="isLoading || !identifier || !password"
          >
            {{ isLoading ? "Pending..." : "Login" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const {
  public: { graphqlURL },
} = useRuntimeConfig();

const isLoading = ref(false);
const identifier = ref("");
const password = ref("");

const session = useSession();
const setSession = useSetSession;

const handleLogin = async () => {
  if (identifier.value && password.value) {
    isLoading.value = true;

    const loginQuery = {
      query: `mutation($identifier: String!, $password: String!) {
        login(input: {identifier: $identifier, password: $password}) {
          jwt
          user {
            id
            username
            email
          }
        }
      }`,
      variables: {
        identifier: identifier.value,
        password: password.value,
      },
    };

    try {
      const { login, errors } = await sendRequest(graphqlURL, {
        body: JSON.stringify(loginQuery),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (errors) {
        throw new Error(errors);
      }
      setSession(login);
      navigateTo("/");
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<style></style>
