<template>
  <div h-full text-center flex select-none>
    <div ma>
      <div text-400px text-primary>
        <icon-custom-not-permission v-if="type === '403'" />
        <icon-custom-not-found v-if="type === '404'" />
        <icon-custom-not-service v-if="type === '500'" />
      </div>
    </div>

    <!-- <router-link :to="{ name: routeHomePath }">
      <n-button type="primary">回到首页</n-button>
    </router-link> -->
  </div>
</template>

<script lang="ts" setup>
// import { routeName } from '@/router'

type ExceptionType = '403' | '404' | '500'

interface Props {
  /** 异常类型 403 404 500 */
  type: ExceptionType
}

defineProps<Props>()

// const routeHomePath = routeName('root')
</script>
<style scoped></style>
