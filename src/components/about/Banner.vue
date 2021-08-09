<template>
    <div class="banner">
        <v-container class="d-flex flex-column align-center justify-center">
            <!-- Title -->
            <h2 class="text-h2 text-center primary--text  font-weight-bold">About us</h2>
            <!-- Description -->
            <p class="text-center mt-8 font-weight-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo asperiores nihil cupiditate ex culpa nesciunt sed corporis et? Debitis quibusdam et modi id quisquam dicta officia. Provident quas praesentium eum nihil veritatis reprehenderit quis ipsam quia in laudantium, rem nulla, id omnis suscipit accusamus ab dolores optio. Eius amet, odio a quasi culpa blanditiis aperiam. Distinctio accusantium ad culpa enim facere.</p>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "Banner",
}
</script>

<style lang="scss" scoped>
.banner {
    height: 500px;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(../../assets/about-banner.jpg);
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    margin-top: -20px;

    .container {
        height: 100%;
    }
}
</style>
