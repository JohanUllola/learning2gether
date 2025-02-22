<template>
  <div class="friends-system">
    <h2 class="title">Amigos en línea 🎮</h2>
    <div class="friends-list">
      <div v-for="friend in friends" :key="friend.id" class="friend-card">
        <div class="avatar-container">
          <i class="fas fa-child avatar-icon"></i>
          <span class="status-dot" :class="friend.status"></span>
        </div>
        <div class="friend-info">
          <h3 class="friend-name">{{ friend.name }}</h3>
          <p class="learning-progress">
            <i class="fas fa-book-open"></i>
            Nivel {{ friend.level }}
          </p>
        </div>
        <button class="action-button">
          <i class="fas fa-gamepad"></i>
          Jugar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const friends = ref([
  { id: 1, name: "Joan Manuel", status: "online", level: 3 },
  { id: 2, name: "Jose Luis", status: "away", level: 5 },
  { id: 3, name: "Jenifer", status: "online", level: 2 },
  { id: 4, name: "Laydi", status: "busy", level: 4 },
  { id: 5, name: "Verzan", status: "online", level: 1 },
  { id: 6, name: "Modesto", status: "offline", level: 6 }
]);
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.friends-system {
  padding: 1.5rem;
  max-width: 600px;
  margin: 2rem auto 0;
  background: $color-cloud;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  color: $color-primary;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.friends-list {
  display: grid;
  gap: 1rem;
}

.friend-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
}

.avatar-container {
  position: relative;
  margin-right: 1rem;

  .avatar-icon {
    font-size: 2.5rem;
    color: $color-secondary;
  }

  .status-dot {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid white;

    &.online {
      background: $color-online;
    }
    &.away {
      background: $color-away;
    }
    &.busy {
      background: $color-busy;
    }
    &.offline {
      background: $color-offline;
    }
  }
}

.friend-info {
  flex-grow: 1;

  .friend-name {
    margin: 0;
    color: $color-dark;
    font-size: 1.1rem;
  }

  .learning-progress {
    margin: 0.3rem 0 0;
    color: $color-gray;
    font-size: 0.9rem;

    i {
      margin-right: 0.5rem;
    }
  }
}

.action-button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  background: $color-primary;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s ease;

  &:hover {
    background: darken($color-primary, 10%);
  }

  i {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .friend-card {
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
  }
  .avatar-container {
    margin: 0 0 1rem;
  }
}
</style>
