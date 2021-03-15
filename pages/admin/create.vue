<template>
    <div>
        <h1>Create new Post</h1>
        <el-form
            :model="controls"
            :rules="rules"
            ref="form"
            @submit.native.prevent="onSubmit"
        >
            <el-form-item label="Type Post title" prop="title">
                <el-input v-model="controls.title" />
            </el-form-item>
            <el-form-item label="Text in format .md or .html" prop="text">
                <el-input
                    v-model="controls.text"
                    type="textarea"
                    resize="none"
                    :rows="10"
                />
            </el-form-item>
            <el-button
                type="success"
                plain
                @click="previewDialog = true"
                class="mb-2"
                >Preview</el-button
            >

            <el-dialog title="Preview" :visible.sync="previewDialog">
                <div :key="controls.text">
                    <vue-markdown>{{ controls.text }}</vue-markdown>
                </div>
            </el-dialog>

            <el-upload
                class="mb-2"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleImageChange"
                :auto-upload="false"
                ref="upload"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                    Drop image here or <em>click to upload</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                    jpg/png files with a size less than 500kb
                </div>
            </el-upload>

            <el-form-item>
                <el-button
                    type="primary"
                    native-type="submit"
                    :loading="loading"
                    round
                >
                    Create Post
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    layout: "admin",
    middleware: ["admin-auth"],
    head: {
        title: `New Post | ${process.env.appName}`
    },
    data() {
        return {
            loading: false,
            previewDialog: false,
            image: null,
            controls: {
                title: "",
                text: ""
            },

            rules: {
                text: [
                    {
                        required: true,
                        message: "Type any text",
                        trigger: "blur"
                    }
                ],

                title: [
                    {
                        required: true,
                        message: "Please type any title",
                        trigger: "blur"
                    }
                ]
            }
        };
    },

    methods: {
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid && this.image) {
                    this.loading = true;
                    try {
                        const formData = {
                            text: this.controls.text,
                            title: this.controls.title,
                            image: this.image
                        };

                        await this.$store.dispatch("post/create", formData);
                        this.$message.success("Post was created");
                        this.controls.text = ''
                        this.controls.title = ''
                        this.image = null
                        this.$refs.upload.clearFiles()
                        this.loading = false;
                    } catch (error) {
                        this.loading = false;
                    }
                } else {
                    this.$message.warning('Form not valid')
                    return false;
                }
            });
        },

        handleImageChange(file, fileList) {
            this.image = file.raw
        }
    }
};
</script>

<style></style>
