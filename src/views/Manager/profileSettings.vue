<template>
    <div class="profile-settings mt-xm-0 mt-md-16">
        <h5 class="text-h4 font-weight-bold mb-5">Account</h5>
        <div v-for="info in profileInfoChunks" :key="info.title" >
            <div class="d-flex justify-space-between align-center py-4">
                <div class="d-flex flex-column align-start justify-center">
                <span class="font-weight-bold">{{ info.title }}</span>
                <span>{{ info.value }}</span>
            </div>
            <v-btn outlined color="primary">change</v-btn>
            </div>
            <v-divider></v-divider>
        </div>
    </div>
</template>

<script>
export default {
    name: "profileSettings",
    data() {
        return {
            profileInfoChunks: [
                {
                    title: "Firstname",
                    value: "firstname value",
                },
                {
                    title: "Lastname",
                    value: "Lastname value",
                },
            ]
        }
    }
}
</script>
