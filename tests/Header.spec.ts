import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

test('Home.vue', async () => {
  const wrapper = mount(Home)
  expect(wrapper.html()).toContain('Home')
})
