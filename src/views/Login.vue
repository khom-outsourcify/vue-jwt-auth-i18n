<template>
  <main>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <div>
        <label>Username</label>
        <input required v-model="username" type="text" placeholder="Username" />
      </div>
      <div>
        <label>Password</label>
        <input required v-model="password" type="password" placeholder="Password" />
      </div>
      <hr />
      <button type="submit">Login</button>
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("security/login", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    // Remove me later
    this.username = "K-003301";
    this.password = "secretstrongpassword";
  }
};
</script>