<template>
  <div
    h-full
    text-center
    bg-blue-200
    flex
    flex-col
    select-none
    all:transition-400
  >
    <div ma>
      <div text-5xl fw100 animate-bounce-alt animate-count-infinite animate-1s>
        <icon-custom-sign />
      </div>
      <div text-lg fw300 m1 text-gray-500>ADNY 前中后台解决方案</div>
      <div m2 flex justify-center text-2xl op30 hover="op80">
        <a
          i-carbon-logo-github
          text-inherit
          href="https://github.com/ErKeLost?tab=repositories"
          target="_blank"
        ></a>
      </div>
    </div>
    <div text-center fw300 m-5 text-gray-500>ERKELOST & ADNY @COPYRIGHT 2022</div>
  </div>
</template>

<script lang="ts" setup></script>
