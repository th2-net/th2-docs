import Vue, {ComponentOptions} from "vue";

declare module "*.vue" {
    export default Vue;
}

declare module 'vue/types/vue' {
    // 3. Declare augmentation for Vue
    interface Vue {
        $static: any
        $page: any
        $route: {
            path: string
            fullPath: string
        }
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        metaInfo?: any;
    }
}
