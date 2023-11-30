<template>
  <div class="search-list">
    <transition-group name="list" tag="ul">
      <li v-for="item in searches" :key="item" class="search-item" @click="selectItem(item)">
        <span class="text">{{ item }}</span>
        <span class="icon" @click.stop="deleteItem(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
type SearchListProps = {
  searches: string[]
}
type SearchListEmits = {
  select: [item: string]
  delete: [item: string]
}

const props = defineProps<SearchListProps>()
const emits = defineEmits<SearchListEmits>()


function selectItem(item: string) {
  emits('select', item)
}

function deleteItem(item: string) {
  emits('delete', item)
}

</script>


<style lang="scss" scoped>
.search-list {
  .search-item {
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;

    .text {
      flex: 1;
      color: $color-text-l;
    }

    .icon {
      @include extend-click();

      .icon-delete {
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }
  }
}
</style>