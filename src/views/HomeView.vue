<template>
  <div class="home">
    <img alt="Logo" src="../assets/logo.svg" />
    <AppVerifyPage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppVerifyPage from '@/components/AppVerifyPage.vue'; // @ is an alias to /src

@Component({
  components: {
    AppVerifyPage,
  },
})
export default class HomeView extends Vue {}
</script>
