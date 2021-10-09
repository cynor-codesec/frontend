<template>
  <b-container class="bv-example-row">
    <b-row class="justify-content-md-center">
      <b-col col>
        <h1 class="mt-4">Cynor</h1>
      </b-col>
    </b-row>
    <Progress step="1" />
    <b-row>
      <div v-if="uploaded" id="upload">
        <img src="@/assets/upload.png" alt="upload icon" />
        <h2 class="pt-3">Upload JD</h2>
      </div>
      <div id="confirm" >
        <h1>Confirm session start with file:</h1>
        <b-card
          img-src="https://imgur.com/mf1Vrjc.png"
          img-alt="Card image"
          img-start
        >
          <b-card-text>
            Junior_web_dev.pdf
            <b-icon id="close" font-scale="1.4" style="float:right;margin-top:0.7px;" icon="x-square-fill"></b-icon>
          </b-card-text>
        </b-card>
        <b-button variant="primary">Create</b-button>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import Progress from "@/components/Progress";
export default {
  name: "Home",
  components: {
    Progress,
  },
  data() {
    return {
      uploaded: false,
    }
  }
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
}
#confirm {
  width: 60%;
  margin:40px auto;
}
#confirm h1 {
  margin-bottom: 35px;
}
#confirm button{
  margin-top: 40px;
  transform: scale(1.3)
}
#close:hover{
  transform: scale(1.1)
}
</style>
