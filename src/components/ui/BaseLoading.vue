<template>
  <section>
    <div class="c1"></div>
    <div class="c2"></div>
    <div class="c3"></div>
    <div class="c4"></div>
    <div class="c5"></div>
  </section>
</template>

<style scoped>
div {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: var(--highlight2);
  border-radius: 4px;
  animation: move 2s ease-in-out both infinite;
}

.c1 {
  animation-delay: 0s;
}
.c2 {
  animation-delay: 0.4s;
}
.c3 {
  animation-delay: 0.8s;
}
.c4 {
  animation-delay: 1.2s;
}
.c5 {
  animation-delay: 1.6s;
}

section {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes move {
  0% {
    transform: translateX(-100px) scale(0.1);
    background-color: var(--highlight2-15);
  }
  25% {
    transform: scale(2);
    background-color: var(--highlight2);
  }
  50% {
    transform: translateX(100px) scale(0.1);
    background-color: var(--highlight2-15);
  }
  75% {
    transform: scale(2);
    background-color: var(--highlight);
  }
  100% {
    transform: translateX(-100px) scale(0.1);
    background-color: var(--highlight-15);
  }
}
</style>
