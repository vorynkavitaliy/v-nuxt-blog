<template>
    <div>
        <el-breadcrumb separator="/" class="mb-2">
            <el-breadcrumb-item :to="{ path: '/admin/list' }">
                All posts
            </el-breadcrumb-item>

            <el-breadcrumb-item> {{ post.title }} </el-breadcrumb-item>
        </el-breadcrumb>

        <el-form
            :model="controls"
            :rules="rules"
            ref="form"
            @submit.native.prevent="onSubmit"
        >
            <el-form-item label="Text in format .md or .html" prop="text">
                <el-input v-model.trim="controls.text" type="textarea" resize="none" :rows="10" />
            </el-form-item>

            <div class="flex mb-2">
                <small>
                    <i class="el-icon-time"></i>

                    <span>
                        {{ new Date(post.date).toLocaleString() }}
                    </span>
                </small>

                <small>
                    <i class="el-icon-view"></i>

                    <span>
                        {{ post.views }}
                    </span>
                </small>
            </div>

            <el-form-item>
                <el-button
                    type="primary"
                    native-type="submit"
                    :loading="loading"
                    round
                >
                    Save
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    layout: "admin",
    middleware: ["admin-auth"],
    head() {
        return {
            title: `${this.post.title} | ${process.env.appName}`
        }
    },

    validate({params}) {
        return !!params.id
    },

    async asyncData({store, params}) {
        const post = await store.dispatch('post/fetchPostAdminById', params.id)
        return {
            post
        }
    },

    data() {
        return {
            loading: false,
            controls: {
                text: '',
            },

            rules: {
                text: [
                    {
                        required: true,
                        message: "Type any text",
                        trigger: "blur"
                    }
                ],
            }
        }
    },

    mounted() {
        this.controls.text = this.post.text
    },

    methods: {
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.loading = true
                    try {
                        const formData = {
                            text: this.controls.text,
                            id: this.post._id
                        }

                        await this.$store.dispatch('post/update', formData)
                        this.$message.success('Post was updates')
                        this.loading = false
                    } catch (error) {
                        this.loading = false
                    }

                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="sass" scoped>
.flex
    display: flex
    justify-content: space-between
    align-items: center
</style>
