<template>
  <b-container class="bv-example-row">
    <b-row class="justify-content-md-center">
      <b-col col>
        <h1 class="mt-4">Cynor</h1>
      </b-col>
    </b-row>
    <Progress step="1" />
    <b-row>
      <div id="selector">
        <br />
        <h2 v-if="this.respURL === ''">Feature Selector:</h2>
        <br />
        <div v-if="this.reqURL === ''">
          <h4>
            Select the area on the doc that contains the
            <strong class="colored">requirements</strong> of this JD.
          </h4>
          <br />
          <clipper-basic class="my-clipper" ref="clipper" :src="imgURL">
            <div class="placeholder" slot="placeholder">No image</div>
          </clipper-basic>

          <b-button @click="getReq" variant="primary" class="btn"
            >Next!</b-button
          >
        </div>

        <div v-if="this.reqURL !== '' && this.respURL === ''" >
          <h4 class="blink_me">
            Now, select the area on the doc that contains the
            <strong class="colored">responsibilities</strong> of this JD.
          </h4>
          <br />
          <clipper-basic
            class="my-clipper"
            ref="clipper"
            :src="imgURL"
          >
            <div class="placeholder" slot="placeholder">No image</div>
          </clipper-basic>

          <b-button @click="getResp" variant="primary" class="btn"
            >Okay!</b-button
          >
        </div>
        <Loading v-if="this.respURL !== ''"/>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import Progress from "@/components/Progress";
import Loading from "@/components/Loading";
import jd from "@/assets/jd.png";
export default {
  name: "Home",
  components: {
    Progress,
    Loading
  },
  data() {
    return {
      imgURL: jd,
      reqURL: "",
      respURL: "",
    };
  },
  methods: {
    getReq: function () {
      const canvas = this.$refs.clipper.clip();
      this.reqURL = canvas.toDataURL("image/png");
      window.scrollTo(0, 0);
    },
    getResp: function () {
      const canvas = this.$refs.clipper.clip();
      this.respURL = canvas.toDataURL("image/png");
      console.log(this.respURL);
      console.log(this.reqURL);
      // send to backend
    },
  },
};
</script>

<style scoped>
h1,
h2 {
  color: #3f20f3;
}
.colored {
  color: #3f20f3;
}

.btn {
  width: 50%;
  margin: 15px auto;
}
.nullalert {
  width: 80%;
  margin: 15px auto 0 auto;
}
.blink_me {
  animation: blinker 1s linear;
}
.bounce_me {
  animation: bounce 1s linear;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
@keyframes bounce {
   0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 
   40% {transform: translateY(-30px);} 
   60% {transform: translateY(-15px);} 
} 
</style>