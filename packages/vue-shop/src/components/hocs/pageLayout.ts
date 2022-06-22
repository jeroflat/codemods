// @ts-ignore
import Vue, { CreateElement, Component } from 'vue';
import Header from 'core/Header.vue';
import Footer from 'core/Footer.vue';

export default function pageLayout(Component: Component) {
  const content = (h: CreateElement) =>
    h(
      'div',
      {
        class: 'layout__content',
      },
      [h(Component)],
    );
  // @ts-ignore
  return Vue.component('pageLayout', {
    // @ts-ignore
    render(h) {
      return h(
        'main',
        {
          class: 'container layout',
        },
        [h(Header), content(h), h(Footer)],
      );
    },
  });
}
