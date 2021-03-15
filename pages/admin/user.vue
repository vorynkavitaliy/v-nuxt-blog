<template>
    <el-card shadow="always" :style="{ width: '500px' }">
        <h2>Create User</h2>
        <el-form
            :model="controls"
            :rules="rules"
            ref="form"
            @submit.native.prevent="onSubmit"
        >
            <el-form-item label="Login" prop="login">
                <el-input v-model.trim="controls.login" />
            </el-form-item>

            <el-form-item label="password" prop="password">
                <el-input v-model.trim="controls.password" type="password"/>
            </el-form-item>

            <el-form-item>
                <el-button
                    type="primary"
                    native-type="submit"
                    :loading="loading"
                    round
                >
                    Create
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    head: {
        title: `Create new User | ${process.env.appName}`
    },

    data() {
        return {
            loading: false,
            controls: {
                login: '',
                password: ''
            },

            rules: {
                login: [
                    {
                        required: true,
                        message: "Type login",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "Type password",
                        trigger: "blur"
                    },
                    {
                        min: 6, 
                        message: 'Password must be more 6 symbols',
                        trigger: "blur"
                    }
                ]
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.loading = true
                    try {
                        const formData = {
                            login: this.controls.login,
                            password: this.controls.password
                        }

                        await this.$store.dispatch('auth/createUser', formData)
                        this.$message.success('New user was added')
                        this.controls.login = ''
                        this.controls.password = ''
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
}
</script>

<style>

</style>