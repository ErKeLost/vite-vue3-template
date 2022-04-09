<script setup lang="ts">
// import batman from '~/assets/batman.png'
import four from '~/assets/4k.svg'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <!-- <div class="batman"></div> -->
  <four />
  <div>
    <i-carbon-4k-filled
      style="color: #fba; font-size: 10rem"
      class="shadow-indigo-300"
    />
  </div>
  <!-- <img class="p-120px text-center" :src="batman" /> -->
</template>

<style>
.batman {
  /* background-image: url(~/assets/batman.png);
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; */
}
</style>
