<template>
  <div
    class="fixed z-50 inset-0 flex flex-col justify-center items-center"
    aria-hidden="true"
  >
    <div
      class="absolute bg-black opacity-40 w-full h-full transition-opacity"
    ></div>
    <div class="spinner ease-linear"></div>
  </div>
</template>
<style>
.spinner {
  @apply rounded-full border-4 border-t-4 border-gray-1 h-12 w-12 border-t-primary;
  animation: spin 1s linear infinite;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
