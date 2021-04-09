import { mapState } from 'vuex'

const baseMixin = {
    computed: {
        ...mapState({
            isMobile: state => state.app.isMobile,
            sideCollapsed: state => state.app.sideCollapsed,
        }),
    },
    methods: {

    }
}

export {
    baseMixin
}
