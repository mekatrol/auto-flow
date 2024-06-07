import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import FlowEditor from '../FlowEditor.vue';

describe('FlowEditor', () => {
  it('renders properly', () => {
    const wrapper = mount(FlowEditor, { props: { msg: 'Hello' } });
    expect(wrapper.text()).toContain('Hello');
  });
});
