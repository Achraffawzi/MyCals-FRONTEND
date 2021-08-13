<template>
  <div class="profile-settings mt-xm-0 mt-md-16">
    <!-- Success on update operation -->
      <v-snackbar v-model="snackbar" top>
        {{ snackbarMessage }}

        <template v-slot:action="{ attrs }">
          <v-btn
            class="white--text"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    <h5 class="text-h4 font-weight-bold mb-5">Account</h5>
    <v-form ref="formUpdate">
      <div>
      <div class="d-flex justify-space-between align-center py-4">
        <div class="d-flex flex-column align-start justify-center">
          <!-- current logged in User avatar -->
          <label
            for="avatarFile"
            v-if="userAvatarSrc != ''"
            style="cursor: pointer"
          >
            <v-avatar id="avatar-image" style="position: relative" size="150">
              <img
                :src="userAvatarSrc"
                max-width="40"
                class="rounded-circle"
                style="cursor: pointer"
                id="actualAvatar"
              />
            </v-avatar>
          </label>
          <label for="avatarFile" v-else style="cursor: pointer">
            <v-avatar
              id="avatar-text"
              style="position: relative"
              color="primary"
              size="150"
            >
              <span class="white--text text-h3" id="avatar-span">{{
                userNameAvatar
              }}</span>
            </v-avatar>
          </label>
          <input
            class="d-none"
            type="file"
            name="avatarFile"
            id="avatarFile"
            @change="setAvatar($event)"
          />
        </div>
      </div>
    </div>

    <div>
      <div class="d-flex justify-space-between align-center py-4">
        <div class="d-flex flex-column align-start justify-center">
          <span class="font-weight-bold">Firstname</span>
          <v-text-field
            v-model="profileInfo.firstName"
            :disabled="!isFirstnameChanging"
            :rules="nameRule"
          >
          </v-text-field>
        </div>
        <v-btn
          outlined
          color="primary"
          @click="isFirstnameChanging = !isFirstnameChanging"
          >{{ changeButtonValue(isFirstnameChanging) }}</v-btn
        >
      </div>
    </div>
    <v-divider></v-divider>

    <div>
      <div class="d-flex justify-space-between align-center py-4">
        <div class="d-flex flex-column align-start justify-center">
          <span class="font-weight-bold">Lastname</span>
          <v-text-field
            v-model="profileInfo.lastName"
            :disabled="!isLastnameChanging"
            :rules="nameRule"
          >
          </v-text-field>
        </div>
        <v-btn
          outlined
          color="primary"
          @click="isLastnameChanging = !isLastnameChanging"
          >{{ changeButtonValue(isLastnameChanging) }}</v-btn
        >
      </div>
    </div>
    <v-divider></v-divider>

    <div>
      <div class="d-flex justify-space-between align-center py-4">
        <div class="d-flex flex-column align-start justify-center">
          <span class="font-weight-bold">Gender</span>
          <v-select
            :items="genders"
            :disabled="!isGenderChanging"
            v-model="profileInfo.gender"
          ></v-select>
        </div>
        <v-btn
          outlined
          color="primary"
          @click="isGenderChanging = !isGenderChanging"
          >{{ changeButtonValue(isGenderChanging) }}</v-btn
        >
      </div>
    </div>
    <v-divider></v-divider>

    <div>
      <div class="d-flex justify-space-between align-center py-4">
        <div class="d-flex flex-column align-start justify-center">
          <span class="font-weight-bold">Date of birth</span>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="profileInfo.date_Of_Birth"
                prepend-icon="mdi-calendar"
                :disabled="!isDobChanging"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="profileInfo.date_Of_Birth"
              no-title
              scrollable
              :rules="dateRule"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(profileInfo.date_Of_Birth)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </div>
        <v-btn
          outlined
          color="primary"
          @click="isDobChanging = !isDobChanging"
          >{{ changeButtonValue(isDobChanging) }}</v-btn
        >
      </div>
    </div>
    <v-divider></v-divider>

    <div>
      <div class="d-flex justify-space-between align-center py-4">
        <div class="d-flex flex-column align-start justify-center">
          <span class="font-weight-bold">Weight</span>
          <v-text-field
            v-model="profileInfo.weight"
            :disabled="!isWeightChanging"
            :rules="numberRule"
          >
          </v-text-field>
        </div>
        <v-btn
          outlined
          color="primary"
          @click="isWeightChanging = !isWeightChanging"
          >{{ changeButtonValue(isWeightChanging) }}</v-btn
        >
      </div>
    </div>
    <v-divider></v-divider>

    <div>
      <div class="d-flex justify-space-between align-center py-4">
        <div class="d-flex flex-column align-start justify-center">
          <span class="font-weight-bold">Height</span>
          <v-text-field
            v-model="profileInfo.height"
            :disabled="!isHeightChanging"
            :rules="numberRule"
          >
          </v-text-field>
        </div>
        <v-btn
          outlined
          color="primary"
          @click="isHeightChanging = !isHeightChanging"
          >{{ changeButtonValue(isHeightChanging) }}</v-btn
        >
      </div>
    </div>
    <v-divider></v-divider>

    <div>
      <div class="d-flex justify-space-between align-center py-4">
        <div class="d-flex flex-column align-start justify-center">
          <span class="font-weight-bold">Calories goal</span>
          <v-text-field
            v-model="profileInfo.calories_goal"
            :disabled="!isCaloriesChanging"
            :rules="numberRule"
          >
          </v-text-field>
        </div>
        <v-btn
          outlined
          color="primary"
          @click="isCaloriesChanging = !isCaloriesChanging"
          >{{ changeButtonValue(isCaloriesChanging) }}</v-btn
        >
      </div>
    </div>
    <v-divider></v-divider>

    <v-btn @click="handleEditProfile" :loading="loadingUpdate" class="white--text primary" text
      >Save changes</v-btn
    >
    </v-form>
  </div>
</template>

<script>
import { END_POINTS, createApiEndPoints, IMAGE_URL } from "@/api.js";
export default {
  name: "userProfileSettings",

  data() {
    return {

      snackbar: false,
      snackbarMessage: "",

      profileInfo: null,

      file: null,

      userAvatarSrc: "",
      userNameAvatar: "",

      isFirstnameChanging: false,
      isLastnameChanging: false,
      isGenderChanging: false,
      isDobChanging: false,
      // isEmailChanging: false,
      isWeightChanging: false,
      isHeightChanging: false,
      isCaloriesChanging: false,

      genders: ["Male", "Female"],

      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,

      // Rules
      nameRule: [
        (name) =>
          (name.length > 0 && isNaN(name)) ||
          "This field is required and must be alphabetic",
      ],
      dateRule: [(date) => date.length > 0 || "Date of birth is required"],
      numberRule: [(value) => !isNaN(value) || "Value must be numeric"],

      loader: null,
      loadingUpdate: false,
    };
  },

  // Get The User Info
  mounted() {
    createApiEndPoints(END_POINTS.GET_USER_INFO)
      .fetch()
      .then((response) => {
        //   response.data.date_Of_Birth = response.data.date_Of_Birth.split('T')[0];
        this.profileInfo = { ...response.data };

        this.profileInfo.date_Of_Birth =
          response.data.date_Of_Birth.split("T")[0];
        this.profileInfo.calories_goal = response.data.calories_Goal;

        // Set the user avatar
        if (response.data.pictureUser != null) {
          this.userAvatarSrc = IMAGE_URL + "" + response.data.pictureUser;
        } else {
          // Set default avatar
          this.userNameAvatar =
            response.data.firstName.charAt(0).toUpperCase() +
            "" +
            response.data.lastName.charAt(0).toUpperCase();
        }
      })
      .catch((error) => console.log(error));

    // this.getUserAvatar(); // Get the user avatar
  },

  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },

  methods: {
    setAvatar(event) {
      this.file = event.target.files[0];
      let reader = new FileReader();

      // If User Select File
      if (this.file) {
        reader.readAsDataURL(this.file);
      }

      // Set src attribut of Image Tag
      let imgSrc = this.userAvatarSrc;
      let file = this.file;
      let avatarSpan = document.querySelector("#avatar-span");
      let avatarText = document.querySelector("#avatar-text");
      let actualAvatar = document.querySelector("#actualAvatar");

      reader.addEventListener("load", function () {
        // If the old photo is just the default one and then the user selected a new picture
        if (imgSrc == null && file != null) {
          console.log("if");
          avatarSpan.style.display = "none";
          let newAvatar = document.createElement("img");
          avatarText.appendChild(newAvatar);

          newAvatar.setAttribute("src", reader.result);

          this.profileInfo.pictureUser = reader.result;
          this.userAvatarSrc = reader.result;
          imgSrc = reader.result;
        }
        // if the old photo is NOT the default and the user changed it
        else if (imgSrc != null && file != null) {
          console.log("else");
          this.userAvatarSrc = reader.result;
          imgSrc = reader.result;
          actualAvatar.setAttribute("src", reader.result);
        } else {
          console.log("else test");
          console.log(imgSrc);
          console.log(file);
        }
      });

      this.userAvatarSrc = imgSrc;
      // this.file = file;
      //   reader.readAsDataURL(file);
    },

    handleChangeFocus() {
      this.isChanging = true;
    },

    changeButtonValue(prop) {
      return prop ? "Save" : "Change";
    },

    handleEditProfile() {
      this.loadingUpdate= true;
      if (this.$refs.formUpdate.validate()) {
        let formData = new FormData();
        formData.append("file", this.file);
        formData.append("FirstName", this.profileInfo.firstName);
        formData.append("LastName", this.profileInfo.lastName);
        formData.append("Gender", this.profileInfo.gender);
        formData.append("Date_Of_Birth", this.profileInfo.date_Of_Birth);
        formData.append("Weight", this.profileInfo.weight);
        formData.append("Height", this.profileInfo.height);
        formData.append("Calories_Goal", this.profileInfo.calories_goal);

        createApiEndPoints(END_POINTS.EDIT_PROFILE)
          .update(formData)
          .then((response) => {
            this.snackbar = true;
            this.snackbarMessage = response.data
            setTimeout(() => {
              location.reload();
            }, 1500);
          })
          .catch((error) => console.log(error));
      } else {
        // error snackbar
        this.snackbar = true;
        this.snackbarMessage = "Please verify your information";
      }

      this.loadingUpdate = false;
    },
  },
};
</script>
