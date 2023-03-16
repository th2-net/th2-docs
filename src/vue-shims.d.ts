import Vue, {ComponentOptions} from "vue"
import { Route } from 'vue-router'
import { Framework } from 'vuetify'

declare module "*.vue" {
    export default Vue;
}

declare module 'vue/types/vue' {
    // 3. Declare augmentation for Vue
    interface Vue {
        $static: any
        $page: any
        $route: Route,
        $vuetify: Framework
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        metaInfo?: any;
    }
}
