<template>
    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="12" :lg="10">
            <app-post v-for="post of posts" :key="post._id" :post="post" />
        </el-col>
    </el-row>
</template>

<script>
import AppPost from "~/components/main/Post.vue";
export default {
    head: {
        title: `Main | ${process.env.appName}`
    },

    components: { AppPost },

    async asyncData({ store }) {
        const posts = await store.dispatch("post/fetch");
        return {
            posts
        };
    }
};
</script>

<style></style>
