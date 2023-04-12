<template>
  <div class="card"><slot name="title"></slot> <slot></slot></div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  border-radius: 8px;
  background: var(--highlight-15);
  border: 1px solid var(--highlight-15);
  min-width: 272px;
  flex-grow: 1;
  margin-top: 8px;
  margin-bottom: 16px;
}
</style>
