<template>
    <div class="error-layout">
        <div class="error-content">
            <h1 class="error-title">Error 404</h1>
            <nuxt-link to="/">Go to Home</nuxt-link>
        </div>
    </div>
</template>

<style lang="sass" scoped>
    .error-layout
        display: flex
        justify-content: center
        align-items: center
        width: 100%
    
    .error-content
        margin: 5rem auto
        display: flex
        flex-direction: column
        align-items: center

    .error-title
        color: red
        margin-bottom: 1rem
</style>