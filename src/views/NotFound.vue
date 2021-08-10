<template>
    <div class="notFound">
        <v-container>
            <v-img class="mx-auto" max-width="600" max-height="500" src="../assets/not-found.svg"></v-img>
            <h4 class="text-h4 primary--text font-weight-bold text-center mb-4">Page Not Found</h4>
            <p class="third--text text-center">Sorry, but the page you are looking for is not found. Please make sure you have typed the correct URL.</p>
            <div class="text-center py-5">
                <v-btn link depressed text to="/" class="white--text primary">Back to home</v-btn>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "NotFound"
}
</script>

<style lang="scss" scoped>

</style>
