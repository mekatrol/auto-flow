<template>
  <div class="menu">
    <div class="menu-item"><button>New</button></div>
    <div class="menu-item"><button>Save</button></div>
    <div class="menu-item"><button>Enable</button></div>
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
}
</style>
