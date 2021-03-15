export const actions = {
    async create({ commit }, payload) {
        try {
            return await this.$axios.$post("/api/comment", {payload});
        } catch (error) {
            commit("setError", error, { root: true });
            throw error;
        }
    },
}