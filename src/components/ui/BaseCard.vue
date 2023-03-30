<template>
  <div class="card">
    <slot name="title"></slot>
    <slot name="values"></slot>
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  background: var(--highlight-15);
  border: 1px solid var(--highlight-15);
}
</style>
