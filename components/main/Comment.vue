<template>
    <el-card class="comment">
        <div class="comment-header">
            <small> {{ comment.name }} </small>
            <small>
                <i class="el-icon-time"></i>
                {{ comment.date | date }}
            </small>
        </div>

        <div class="comment-text">
            {{ comment.text }}
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'Comments',
    props: {
        comment: {
            type: Object,
            require: true
        }
    }
}
</script>

<style lang="sass" scoped>
    .comment
        margin-bottom: 1rem

        &-header
            display: flex
            align-items: center
            justify-content: space-between
            margin-bottom: 0.5rem
        
        &-text
            white-space: pre-line
</style>