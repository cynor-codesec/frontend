<template>
  <b-container class="bv-example-row">
    <b-row class="justify-content-md-center">
      <b-col col>
        <h1 class="mt-4">Cynor</h1>
      </b-col>
    </b-row>
    <Progress step="4" />
    <h4>Search</h4>
    <Loading v-if="loading"/>
    <b-row v-if="!loading" style="width:80%; margin:0 auto;" class="mt-4">
      <b-col lg="10">
        <input class="w-100 h-100" v-model="query" style="margin-top: 1px" type="text" placeholder="Search...ex: 2 years of java experience" />
      </b-col>
      <b-col lg="2">
        <b-button class="w-100 h-100" variant="primary" @click="search">
          <b-icon
            font-scale="1.4"
            icon="search"
          ></b-icon>
          Search
        </b-button>
      </b-col>
    </b-row>
    <br />
    <div v-for="(cv, ix) in cvInfo" class="box" :key="ix" style="textAlign: none; width:90%; margin: 10px auto;">
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
  </b-container>
</template>

<script>
import Progress from "@/components/Progress";
import Loading from "@/components/Loading";
import axios from "axios";
export default {
  name: "Search",
  components: {
    Progress,
    Loading
  },
  data() {
    return {
      loading: false,
      query: "",
      cvInfo: []
    };
  },
  methods: {
      search(){
        this.loading= true;
        let self = this;
        let jd = this.$route.params.id;
        axios.get("https://api-cynor.syncfire.com.au/search?jd_id="+jd+"&query="+this.query)
            .then(function (response) {
                self.cvInfo = response.data.results;
                self.loading = false;
            })
            .catch(function (response) {
                console.log(response);
            });
      },
      expand(cv_id){
      this.$router.push('/report/'+this.$route.params.id+"/"+cv_id);
    }
  },
};
</script>

<style scoped>
h1,
h2 {
  color: #3f20f3;
}
input {
    border-radius: 5px;
    border: 1px solid #3f20f3;
    padding-left: 20px;
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
