import {
  computed,
  h,
  mergeProps,
  nextTick,
  ref,
  renderSlot,
  watch,
  withCtx,
  defineComponent,
} from 'vue'
import Scroll from '@/components/base/scroll/Scroll.vue'
import useStore from '@/stores/store'

export default defineComponent<typeof Scroll>({
  name: 'wrap-scroll',
  props: Scroll.props,
  emits: Scroll.emits,
  render(ctx: any) {
    return h(
      Scroll,
      mergeProps({ ref: 'scrollRef' }, ctx.$props, {
        onScroll: (e: any) => {
          ctx.$emit('scroll', e)
        },
      }),
      {
        default: withCtx(() => {
          return [renderSlot(ctx.$slots, 'default')]
        }),
      }
    )
  },
  setup() {
    const scrollRef = ref(null)
    const scroll = computed(() => {
      return (scrollRef.value as any).scroll
    })
    const store = useStore()
    const playlist = computed(() => store.playList)

    watch(playlist, async () => {
      await nextTick()
      scroll.value.refresh()
    })

    return {
      scrollRef,
      scroll,
    }
  },
})
