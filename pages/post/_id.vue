<template>
    <article class="post">
        <header class="post-header">
            <div class="post-title">
                <nuxt-link to="/">
                    <i class="el-icon-back"></i>
                </nuxt-link>
                <h1>{{ post.title }}</h1>
            </div>
            <div class="post-info">
                <small>
                    <i class="el-icon-time"></i>
                    {{ new Date(post.date).toLocaleString() }}
                </small>
                <small>
                    <i class="el-icon-view"></i>
                    {{ post.views }}
                </small>
            </div>

            <div class="post-img">
                <img :src="post.imageUrl" alt="img" />
            </div>
        </header>
        <main class="post-content">
            <vue-markdown>{{ post.text }}</vue-markdown>
        </main>

        <footer class="post-footer">
            <app-comment-form
                @created="createCommentHandler"
                :postId="post._id"
                v-if="canAddComment"
            />

            <div class="comments" v-if="post.comments.length">
                <app-comment
                    v-for="comment of post.comments"
                    :key="comment._id"
                    :comment="comment"
                />
            </div>

            <div v-else class="text-center">
                Comments no allowed
            </div>
        </footer>
    </article>
</template>

<script>
import AppComment from "~/components/main/Comment.vue";
import AppCommentForm from "~/components/main/CommentForm.vue";
export default {
    async asyncData({ store, params }) {
        const post = await store.dispatch("post/fetchPostById", params.id);
        await store.dispatch("post/addPostViews", post);

        return {
            post: {...post, views: ++post.views}
        };
    },

    head() {
        return {
            title: `${this.post.title} | ${process.env.appName}`
        }
        
    },

    components: { AppComment, AppCommentForm },

    validate: ({ params }) => !!params.id,

    data() {
        return {
            canAddComment: true
        };
    },

    methods: {
        createCommentHandler(comment) {
            this.post.comments.unshift(comment)
            this.canAddComment = false;
        }
    }
};
</script>

<style lang="sass" scoped>
.post
    max-width: 700px
    margin: auto
    width: 100%

    &-title
        display: flex
        justify-content: space-between
        align-items: center
        margin-bottom: 1rem

        h1
            margin: auto

    &-info
        width: 100%
        display: flex
        align-items: center
        justify-content: space-between
        margin: 1rem auto

    &-img
        margin-bottom: 1rem
        img
            width: 100%

    &-content
        p
            margin-bottom: 1rem

    &-footer
        margin-top: 2rem
</style>
