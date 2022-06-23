/**
 * @see https://www.thisdot.co/blog/your-first-vue-3-app-using-typescript
 *
 * ```
 * import { createApp } from 'vue';
 * import App from './App.vue'
 *        ^^^
 * createApp(App).mount('#app')
 * ```
 *
 * Typescript, like ES 6, supports modules by using the keywords import and export.
 * As long as you are writing your modules in TypeScript, that is, module files ending with .ts
 * then you are covered.
 *
 * The error above signals that TypeScript is not able to import the App component, as if
 * the App.vue module returned is not understood by TypeScript.
 */
declare module '*.vue' {
  import { defineComponent } from 'vue';

  const component: ReturnType<typeof defineComponent>;

  export default component;
}
