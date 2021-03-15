<template>
    <div class="empty-layout">
        <Nuxt />
    </div>
</template>

<script>
export default {
    computed: {
        error() {
            return this.$store.getters.error
        }
    },

    watch: {
        error(value) {
            this.$message.error(value.response.data.message)
        }
    }
}
</script>

<style lang="sass" scoped>
    .empty-layout
        width: 100%
        height: 100%
        display: flex
        align-items: center
        justify-content: center
        padding-top: 5rem
</style>