<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <!-- <transition
        :name="theme.page.animate ? theme.page.animateMode : undefined"
        mode="out-in"
        appear
      >
        <keep-alive :include="routeStore.cacheRoutes">
          <component :is="Component" v-if="app.reloadFlag" :key="route.path" />
        </keep-alive>
      </transition> -->
      <component :is="Component" :key="route.path" />
    </router-view>
  </div>
</template>
