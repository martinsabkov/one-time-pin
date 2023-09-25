<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #101828;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #101828;

    &.router-link-exact-active {
      color: #424eb9;
    }
  }
}
</style>
