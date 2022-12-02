import Vue from "vue";

declare module "*.vue" {
    export default Vue;
}

declare module 'vue/types/vue' {
    // 3. Declare augmentation for Vue
    interface Vue {
        $route: {
            path: string
            fullPath: string
        }
    }
}
