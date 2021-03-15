<template>
    <div>
        <h1>Analitics for the posts</h1>
        <analytic-chart
            title="Views Size"
            :labels="analytics.views.labels"
            :data="analytics.views.data"
        />

        <analytic-chart
            title="Comments Size"
            :labels="analytics.comments.labels"
            :data="analytics.comments.data"
        />
    </div>
</template>

<script>
import AnalyticChart from '~/components/admin/AnalyticChart.vue'
export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    components: { AnalyticChart },
    head: {
        title: `Analytics | ${process.env.appName}`
    },
    async asyncData({store}) {
        const analytics = await store.dispatch('post/getAnalytics')
        return {
            analytics
        }
    }
}
</script>

<style>

</style>