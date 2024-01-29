import type {Ref} from "vue";

export interface CurrentUser {
    username: Ref<string>
    logout: () => Promise<void>
}
