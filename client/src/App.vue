<template>
  <v-app>
    <v-app-bar app color="horizAppBar" dark>
      <v-btn text v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
        <v-icon left class="hidden-sm-only">{{ item.icon }} </v-icon>
        {{ item.title }}
      </v-btn>
    </v-app-bar>

    <!-- App Content -->
    <v-main>
      <v-container class="mt-3">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => {
    return {};
  },
  computed: {
    horizontalNavItems() {
      let items = [
        { icon: 'create', title: 'ClusterStor', link: '/e1000' },
        { icon: 'create', title: 'Shasta', link: '/shasta' }
      ];
      return items;
    }
  }
};
</script>
