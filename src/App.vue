<template>
  <div id="app">
    <div id="nav" v-if="isAuthenticated">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters({
    isAuthenticated: "security/isAuthenticated"
  }),
  methods: {
    logout() {
      this.$store.dispatch("security/logout").then(() => {
        this.$router.push("/login");
      });
    }
  },
  created() {
    this.$http.interceptors.response.use(undefined, err => {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("security/logout");
        }
        throw err;
      });
    });
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
