<template>
  <div class="menu">
    <div class="menu-item">
      <button><span class="material-symbols-outlined">add</span>New</button>
    </div>
    <div class="menu-item">
      <button><span class="material-symbols-outlined">save</span>Save</button>
    </div>
    <div class="menu-item">
      <button><span class="material-symbols-outlined">check_box</span>Enable</button>
    </div>
  </div>
</template>

<style scoped lang="css">
.menu {
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  flex-direction: row;
}

.menu-item button {
  padding-inline: 0.5rem;
  padding-block: 0.2rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3rem;
}
</style>
