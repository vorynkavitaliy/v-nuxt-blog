<template>
    <div class="admin-layout">
        <el-container :style="{ height: '100%' }">
            <el-aside width="200px">
                <app-aside />
            </el-aside>
            <el-main>
                <Nuxt />
            </el-main>
        </el-container>
    </div>
</template>

<script>
import AppAside from "~/components/admin/Aside.vue";
export default {
    components: { AppAside },
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
};
</script>

<style lang="sass" scoped>
.admin-layout
    height: 100vh
    width: 100%
</style>
