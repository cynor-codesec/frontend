<template>
  <b-container class="bv-example-row">
    <b-row class="justify-content-md-center">
      <b-col col>
        <h1 class="mt-4">Cynor</h1>
      </b-col>
    </b-row>
    <Progress step="1" />
    <b-row v-if="!loading">
      <div v-if="!uploaded" id="upload">
        <input id="file" type="file" @change="onFileChange" />
        <img src="@/assets/upload.png" alt="upload icon" />
        <h2 class="pt-3">Upload JD</h2>
      </div>
      <div v-if="uploaded" id="confirm">
        <h1>Confirm session start with file:</h1>
        <b-card :img-src="banner" img-alt="Card image" img-start>
          <b-card-text>
            {{ fileName }}
            <b-icon
              @click="cancel"
              id="close"
              font-scale="1.4"
              style="float: right; margin-top: 0.7px"
              icon="x-square-fill"
            ></b-icon>
          </b-card-text>
        </b-card>
        <b-button variant="primary" @click="upload">Create</b-button>
      </div>
    </b-row>
    <Loading v-if="loading" />
  </b-container>
</template>

<script>
import Progress from "@/components/Progress";
import Loading from "@/components/Loading";
import Banner from "@/assets/banner.png";
import axios from "axios";
export default {
  name: "Home",
  components: {
    Progress,
    Loading,
  },
  data() {
    return {
      uploaded: false,
      file: "",
      fileName: "",
      loading: false,
      banner: Banner,
    };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
      this.fileName = files[0].name;
      this.uploaded = true;
    },
    upload() {
      let self = this;
      this.loading = true;
      let formData = new FormData();
      formData.append("file", this.file);
      console.log(this.file);
      console.log(formData.has("file"));
      axios({
        method: "post",
        url: "https://api-cynor.syncfire.com.au/send-jd",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          self.loading=false;
          self.$router.push("/feature-selector/"+response.data._id);
        })
        .catch(function (response) {
          self.loading=false;
          self.cancel();
          console.log(response);
        });
    },
    cancel() {
      this.fileName = "";
      this.file = "";
      this.uploaded = false;
    },
  },
};
</script>

<style scoped>
h1,
h2 {
  color: #3f20f3;
}
#upload {
  width: 80%;
  margin: 40px auto;
  border: 1px solid #3f20f3;
  border-radius: 25px;
  padding: 10vh 0;
  position: relative;
}
#confirm {
  width: 60%;
  margin: 40px auto;
}
#confirm h1 {
  margin-bottom: 35px;
}
#confirm button {
  margin-top: 40px;
  transform: scale(1.3);
}
#close:hover {
  transform: scale(1.1);
}
#file {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: -0.1%;
  top: -0.1%;
  cursor: pointer;
}
</style>
