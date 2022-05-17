import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

test('Home.vue', async () => {
  const wrapper = mount(Home)
  expect(wrapper.html()).toContain('lgp Test')
  expect(wrapper.html()).toContain('travis')
  expect(wrapper.html()).toContain('fixed')
  expect(wrapper.html()).toContain('email')
  expect(wrapper.html()).toContain('main')
  expect(wrapper.html()).toContain('name')
  expect(wrapper.html()).toContain('xxx')
  expect(wrapper.html()).toContain('yyy')
})
