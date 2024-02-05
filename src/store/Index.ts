import { defineStore } from "pinia";
import { Ref, computed, ref } from "vue";

// > 当前用户
export const useUserInfoStore = defineStore("userInfo", {
    state: () => {
        return {
            id: 1001 as Number,
            name: "admin" as String,
            authors: [] as String[],
        }
    },
    getters: {
        getAuthors: (state): Array<String> => state.authors
    },
    actions: {
        addAuthors(author): void {
            this.authors.push(author);
        },
    },
});

// > 账户信息
export const useAccountsStore = defineStore("accounts", () => {
    let orl = [{ name: "admin", password: "admin", id: 1000 },
    { name: "root", password: "root", id: 1002 },
    { name: "zhangsan", password: "zhangsan", id: 1003 },
    { name: "lisi", password: "lisi", id: 1004 },
    { name: "user", password: "user", id: 1005 },
    { name: "zhaoliu", password: "zhaoliu", id: 1006 }];
    let accounts: Ref<Array<any>> = ref(JSON.parse(JSON.stringify(orl)));

    let getAccounts: Ref<String> = computed(() => accounts);

    let addAccount: Function = (account): void => accounts.value.push(account);

    let findAccount: any = (name: string): any => accounts.value.find(item => item.name = name);

    let $reset = (): void => {
        accounts.value.splice(0, accounts.value.length);
        accounts.value.push(...JSON.parse(JSON.stringify(orl)));
    }


    return { accounts, getAccounts, addAccount, findAccount, $reset };
});

// > 角色
export const useRolesStore = defineStore("roles", () => {
    let roles: Ref<String> = ref(["admin", "juese1", "juese2", "juese3"]);

    let roleSize: Function = computed(() => roles.value.length);

    let addRole: Function = (role): void => roles.value.push(role);
});