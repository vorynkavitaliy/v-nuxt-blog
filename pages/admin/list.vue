<template>
    <el-table :data="posts" style="width: 100%">
        <el-table-column prop="title" label="Name" />

        <el-table-column label="Date" width="250">
            <template slot-scope="{ row: { date } }">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">
                    {{ new Date(date).toLocaleString() }}
                </span>
            </template>
        </el-table-column>

        <el-table-column label="Views">
            <template slot-scope="{ row: { views } }">
                <i class="el-icon-view"></i>
                <span style="margin-left: 10px">{{ views }}</span>
            </template>
        </el-table-column>

        <el-table-column label="Comments">
            <template slot-scope="{ row: { comments } }">
                <i class="el-icon-message"></i>
                <span style="margin-left: 10px">{{ comments.length }}</span>
            </template>
        </el-table-column>

        <el-table-column label="Actions">
            <template slot-scope="{ row }">
                <el-tooltip
                    effect="dark"
                    content="Edit"
                    placement="top"
                >
                    <el-button
                        icon="el-icon-edit"
                        size="mini"
                        type="primary"
                        @click="open(row._id)"
                    />
                </el-tooltip>
                <el-tooltip
                    effect="dark"
                    content="Delete"
                    placement="top"
                >
                    <el-button
                        icon="el-icon-delete"
                        size="mini"
                        type="danger"
                        @click="remove(row._id)"
                    />
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    layout: "admin",
    middleware: ["admin-auth"],
    async asyncData({ store }) {
        const posts = await store.dispatch("post/fetchAdminPosts");
        return {
            posts
        };
    },

    head: {
        title: `All Posts | ${process.env.appName}`
    },

    methods: {
        open(id) {
            console.log(`/admin/post/${id}`);
            this.$router.push(`/admin/post/${id}`)
        },

        async remove(id) {
            try {
                await this.$confirm('Remove post?', 'Warning', {
                    confirmButtonText: 'Ok',
                    cancelButtonText: 'Cancle',
                    type: 'warning'
                })
                await this.$store.dispatch('post/remove', id)

                this.posts = this.posts.filter(post => post._id !== id)

                this.$message.success('Post was deleted')
            } catch (error) {
                
            }
            
        }
    }
};
</script>

<style></style>
