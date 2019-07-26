<template>
  <div id="nav" class="navigation">
    <router-link :to="$i18nRoute({ name: 'home'})">HelloWorld Page</router-link>
    <router-link :to="$i18nRoute({ name: 'about'})">About Page</router-link>
  </div>
</template>

<style lang="scss">
#nav {
  padding: 10px;
  a {
    margin: 0 7px;
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
