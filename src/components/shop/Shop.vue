<template>
    <div>
        <app-header></app-header>
        shop
        <router-view></router-view>
    </div>
</template>

<script>
import appHeader from './subcom/AppHeader'
    export default {
        components: {
            appHeader
        }
    }
</script>

<style scoped>

</style>