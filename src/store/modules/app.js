import storage from 'store'

const app = {
    state: {
        sideCollapsed: false,
        isMobile: false,
    },
    mutations: {
        "sidebar_type": (state, type) => {
            state.sideCollapsed = type
            storage.set("sidebar_type", type)
        },
        "is_mobile": (state, isMobile) => {
            state.isMobile = isMobile
        },
    }

}

export default app