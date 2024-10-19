<template>
  <div class="page page-register">
    <div class="wrapper">
      <form
        class="form-container"
        @submit.prevent="handleRegister"
        autocomplete="off"
      >
        <div class="form-header">
          <h2>Sign Up</h2>
        </div>
        <div class="form-wrapper">
          <div class="form-control">
            <label for="username">Name</label>
            <input
              require
              id="username"
              type="text"
              class="form-input"
              v-model="username"
            />
          </div>
          <div class="form-control">
            <label for="email">Email</label>
            <input
              required
              id="email"
              type="email"
              class="form-input"
              v-model="email"
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
            :disabled="isLoading || !username || !email || !password"
          >
            {{ isLoading ? "Pending..." : "Register" }}
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
const username = ref("");
const email = ref("");
const password = ref("");

const session = useSession();
const setSession = useSetSession;

const handleRegister = async () => {
  if (username.value && email.value && password.value) {
    isLoading.value = true;

    const registerQuery = {
      query: `mutation($username: String!, $email: String!, $password: String!) {
        register(input: {username: $username, email: $email, password: $password}) {
          jwt
          user {
            id
            username
            email
          }
        }
      }`,
      variables: {
        username: username.value,
        email: email.value,
        password: password.value,
      },
    };

    try {
      const { register, errors } = await sendRequest(graphqlURL, {
        body: JSON.stringify(registerQuery),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (errors) {
        throw new Error(errors);
      }
      setSession(register);
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
