<template>
    <el-card shadow="always" :style="{ width: '500px' }">
        <h2>Login to admin panel</h2>
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
                    Log in
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    layout: "empty",
    head: {
        title: `Login to Admin Panel | ${process.env.appName}`
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

    mounted() {
        const {message} = this.$route.query
        switch (message) {
            case 'login':
                this.$message.info('For first login in system')
                break;

            case 'logout':
                this.$message.success('You are success Log out')
                break;
            
            case 'session':
                this.$message.warning('Your session was end, please login again')
        
            default:
                break;
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

                        await this.$store.dispatch('auth/login', formData)
                        this.loading = false
                        this.$router.push('/admin')
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
