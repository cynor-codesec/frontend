<template>
  <b-container class="bv-example-row">
    <b-row class="justify-content-md-center">
      <b-col col>
        <h1 class="mt-4">Cynor</h1>
      </b-col>
    </b-row>
    <Progress step="4" />
    <b-row v-if="!loading" id="report">
      <b-col md="9" class="mt-4">
        <div id="heading">
          <h2>Report</h2>
          <div>
            <b-button variant="primary" id="search-btn">
              <b-icon
                font-scale="1.4"
                style="float: right; margin-top: 0.7px"
                icon="search"
              ></b-icon>
            </b-button>
            <b-button @click="downloadCsv" variant="primary">
              <b-icon
                font-scale="1.4"
                style="float: right; margin-top: 0.7px"
                icon="cloud-download"
              ></b-icon>
            </b-button>
          </div>
        </div>
        <b-row id="list" class="mt-2">
          <div v-for="(cv, ix) in cvInfo" class="box" :key="cv._id" style="textAlign: none; width:90%; margin: 10px auto;">
            <div class="title-cv">
              <div style="display:flex;align-items:center;">
              <h5 class="highlight-alt mt-1" style="borderRadius:5px;padding:10px;">{{ix+1}}</h5>
              <div style="padding: 7px"></div>
              <h3>{{cv.name}}</h3>
              </div>
              <div>
                
                <h5 class="highlight ext">Score: {{Math.round((cv.cv_feature_store.total_score + Number.EPSILON) * 100) / 100}}</h5>
              </div>
            </div>
            <div style="textAlign: left;margin: 20px 20px;" class="spc-bt">
              <div>
              <h5>{{cv.email}}, <a href="tel:+4733378901">{{cv.mobile_number}}</a></h5>
              <h5><a :href="'https://api-cynor.syncfire.com.au/'+cv.file">link to cv</a></h5>
              </div>
              <b-button @click="expand(cv._id)" variant="primary">
                <b-icon
                font-scale="1.4"
                style="margin-top: 0.7px"
                icon="arrows-angle-expand"
              ></b-icon>
                Expand 
              </b-button>
            </div>
          </div>
          
        </b-row>
      </b-col>
      <b-col md="3" class="mt-4">
        <b-row class="box">
          <h2 class="mt-3">Stats</h2>
          <div v-if="!statLoading" style="textAlign: left" class="mt-3">
            <h4>Total Candidates: <span class="highlight">{{stats.total}}</span></h4>
            <h4 class="mt-3">Mean Score: <span class="highlight">{{stats.mean}}</span></h4>
            <h4 class="mt-3">
              Median Score: <span class="highlight">{{stats.median}}</span>
            </h4>
            <br />
            <h5><span style="color:green;">Good</span> Candidates: <span class="highlight">{{stats.good_per * 100}}%</span></h5>
            <h5 class="mt-3">
              <span style="color:red;">Bad</span>  Candidates: <span class="highlight">{{stats.bad_per * 100}}%</span>
            </h5>
          </div>
          <div v-if="statLoading"  style="textAlign:center;" class="mb-5">
          <b-spinner variant="primary" style="width: 5rem; height: 5rem; margin-top:45px"></b-spinner>
          </div>
          <div style="display: flex; flexDirection: column" class="box-2 mt-3">
            <br />
            <h2>Review</h2>
            <br />
            <input class="rev-inp" type="number" placeholder="out of 10" />
            <br />
            <textarea class="rev-inp" placeholder="remarks " />
            <br />
            <b-button variant="primary">Send</b-button>
            <br />
          </div>
        </b-row>
      </b-col>
    </b-row>
    <b-spinner v-if="loading && !processed" variant="primary" style="width: 5rem; height: 5rem; margin-top:45px"></b-spinner>
    <div v-if="loading && processed" id="loadin" class="box p-4" style="marginTop:20vh">  
      <h3 style="marginTop:0;">Percentage of CVs processed:</h3>
      <b-progress :value="processed_cvs" :max="total_cv" show-progress animated></b-progress>
      <h4 class="mt-2" style="marginBottom:0;">ETA: {{Math.round(remaining_cvs*1.6)}} minutes</h4>
    </div>
  </b-container>
</template>

<script>
import Progress from "@/components/Progress";
import axios from"axios";

export default {
  name: "Report",
  components: {
    Progress,
  },
  data() {
    return {
      cvInfo: [],
      total_cv: "",
      processed_cvs: "",
      remaining_cvs: "",
      loading: true,
      processed: false,
      stats:{
        mean:0,
        total: 0,
        median: 0,
        bad: [],
        good: [],
        bad_per: 0,
        good_per: 0,
      },
      statLoading: true,
    };
  },
  methods: {
    getReport(jd_id, self) {
      console.log("ping")
      axios.get("https://api-cynor.syncfire.com.au/get-cvs?id="+jd_id)
      .then(function (response) {
          if (response.data.remaining !== 0){
            self.processed = true;
            self.total_cv = response.data.total_cvs;
            self.processed_cvs = response.data.processed;
            self.remaining_cvs = response.data.remaining;
          } else {
            console.log("here")
            self.loading=false;
            self.processed = false;
            clearInterval(self.interval);
            console.log(response.data.cvs)
            self.cvInfo = response.data.cvs;
            self.getStats();
          }
        })
        .catch(function (response) {
          self.loading=false;
          console.log(response);
        });
    },
    getStats(){
      let jd = this.$route.params.id;
      let self= this;
      axios.get("https://api-cynor.syncfire.com.au/get-stats?id="+jd)
      .then(function (response) {
          self.statLoading = false;
          console.log(response.data);
          self.stats = response.data;
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    downloadCsv(){
      let jd = this.$route.params.id;
      axios.get("https://api-cynor.syncfire.com.au/get-csv?id="+jd)
      .then(function (response) {
          window.open("https://api-cynor.syncfire.com.au/"+response.data.csv);
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    expand(cv_id){
      this.$router.push('/report/'+this.$route.params.id+"/"+cv_id);
    }
  },
  mounted() {
    let self=this;
    let jd_id = this.$route.params.id;
    this.getReport(jd_id, self);
    this.interval = setInterval(() => this.getReport(jd_id, self), 10000);
  }
};
</script>

<style scoped>
h1,
h2,
h3 {
  color: #3f20f3;
}
#heading h2 {
  text-align: left;
}
#heading {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
}
#search-btn {
  margin-right: 10px;
}
.box {
  border: 1px solid #3f20f3;
  border-radius: 20px;
}
.rev-inp {
  border: 1px solid #3f20f3;
  border-radius: 5px;
}
.box-2 {
  background-color: #f5f5fabb;
  border-radius: 20px;
}
.highlight {
  border: 1px solid #3f20f3;
  padding: 0 5px;
  color: #3f20f3;
  border-radius: 10px;
}
.highlight-alt {
  background-color: #3f20f3;
  padding: 0 5px;
  color: white;
  border-radius: 10px;
}
.title-cv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px;
}
.title-cv div {
  display: flex;
}
.ext {
  padding: 10px;
}
.spc-bt {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#loadin {
  width: 60%;
  margin: 0 auto;
}
</style>