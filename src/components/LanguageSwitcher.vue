<template>
  <select class="language-switcher" name="language" @change="changeLanguage">
    <option
      v-for="lang in supportedLanguages"
      :key="lang"
      :selected="isCurrentLanguage(lang)"
      :class="{ 'is-selected': isCurrentLanguage(lang) }"
      :value="lang"
    >{{lang}}</option>
  </select>
</template>
<script>
import { translation } from "@/plugins/translation";

export default {
  computed: {
    supportedLanguages() {
      return translation.supportedLanguages;
    },
    currentLanguage() {
      return translation.currentLanguage;
    }
  },
  methods: {
    changeLanguage(e) {
      const lang = e.target.value;
      const to = this.$router.resolve({ params: { lang } });
      return translation.changeLanguage(lang).then(() => {
        this.$router.push(to.location);
      });
    },
    isCurrentLanguage(lang) {
      return lang === this.currentLanguage;
    }
  }
};
</script>