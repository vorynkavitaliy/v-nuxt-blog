export const state = () => ({});

export const mutations = {};

export const actions = {
    async fetchAdminPosts({ commit }) {
        try {
            return await this.$axios.$get("/api/post/admin");
        } catch (error) {
            commit("setError", error, { root: true });
            throw error;
        }
    },

    async fetchPostAdminById({ commit }, payload) {
        console.log(`/api/post/admin/${payload}`);
        try {
            return await this.$axios.$get(`/api/post/admin/${payload}`);
        } catch (error) {
            commit("setError", error, { root: true });
            throw error;
        }
    },

    async update({ commit }, payload) {
        const { id, text } = { ...payload };
        try {
            return await this.$axios.$put(`/api/post/admin/${id}`, { text });
        } catch (error) {
            commit("setError", error, { root: true });
            throw error;
        }
    },

    async create({ commit }, payload) {
        const { title, text, image } = { ...payload };
        try {
            const FD = new FormData();
            FD.append("title", title);
            FD.append("text", text);
            FD.append("image", image, image.name);

            await this.$axios.$post("/api/post/admin", FD);
            return 
        } catch (error) {
            commit("setError", error, { root: true });
            throw error;
        }
    },

    async remove({ commit }, payload) {
        try {
            return await this.$axios.$delete(`/api/post/admin/${payload}`);
        } catch (error) {
            commit("setError", error, { root: true });
            throw error;
        }
    },

    async fetch({ commit }) {
        try {
            return await this.$axios.$get("/api/post");
        } catch (error) {
            commit("setError", error, { root: true });
            throw error;
        }
    },

    async fetchPostById({ commit }, payload) {
        try {
            return await this.$axios.$get(`/api/post/${payload}`);
        } catch (error) {
            commit("setError", error, { root: true });
            throw error;
        }
    },

    async addPostViews({ commit }, {_id, views}) {
        try {
            return await this.$axios.$put(`/api/post/add/view/${_id}`, {views});
        } catch (error) {
            commit("setError", error, { root: true });
            throw error;
        }
    },

    async getAnalytics({ commit }) {
        try {
            return await this.$axios.$get(`/api/post/admin/get/analytics`);
        } catch (error) {
            commit("setError", error, { root: true });
            throw error;
        }
    },
};

export const getters = {};
