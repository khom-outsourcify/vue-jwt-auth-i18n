<template>
  <div id="app">
    <Navigation v-if="isAuthenticated" />

    <p>
      <button v-if="isAuthenticated" @click="logout">Logout</button>
    </p>

    <LanguageSwitcher />

    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Navigation from "@/components/Navigation";

export default {
  components: {
    LanguageSwitcher,
    Navigation
  },
  computed: mapGetters({
    isAuthenticated: "security/isAuthenticated"
  }),
  methods: {
    logout() {
      this.$store.dispatch("security/logout").then(() => {
        this.$router.push(this.$i18nRoute({ name: "login" }));
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
</style>
