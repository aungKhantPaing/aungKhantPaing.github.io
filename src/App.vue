<template>
  <router-view></router-view>
</template>

<script lang="ts">
let ROOT_PATH = 'https://du-map.netlify.app';
import Vue from 'vue';
import { App } from '@/models/appState';
export default Vue.extend({
  data() {
    return {
      logo: ROOT_PATH + require('./assets/logo.png'),
    };
  },
  metaInfo() {
    let title = 'DU Map';
    let content = 'Find your way in Dagon University';
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used

      title: title,
      // all titles will be injected into this template
      // titleTemplate: '%s | My Awesome Webapp',
      meta: [
        // Description
        {
          name: 'description',
          content: content,
        },
        // Twitter Card
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: title },
        {
          name: 'twitter:description',
          content: content,
        },
        // image must be an absolute path
        { name: 'twitter:image', content: this.$data.logo },
        // Facebook OpenGraph
        { property: 'og:title', content: title },
        { property: 'og:site_name', content: title },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: this.$data.logo },
        {
          property: 'og:description',
          content: content,
        },
      ],
    };
  },
  mounted() {
    // if (!window.navigator.onLine) {
    //   this.$router.replace('/offline');
    // }
  },
});
</script>
