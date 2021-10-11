<template>
  <b-container class="bv-example-row">
    <b-row class="justify-content-md-center">
      <b-col col>
        <h1 class="mt-4">Cynor</h1>
      </b-col>
    </b-row>
    <Progress step="4" />
    <div>
      <div v-if="!loading" class="main">
        <h1>{{data.name}}</h1>
        <h4>{{data.email}}</h4>
        <h4>{{data.mobile_number}}</h4>
        <a :href="'https://api-cynor.syncfire.com.au/'+data.file">link to file</a>
        <br />
        <a v-if="data.github_link !== null" :href="data.github_link">link to github</a>
        <br />
        <h5 ><span class="colored">Score:</span> {{data.cv_feature_store.total_score}}</h5>
        <h5 v-if="data.designation !== null" ><span class="colored">Designation:</span> {{data.designation.toString()}}</h5>
        <h5 v-if="data.total_experience !== null"><span class="colored">Total experience:</span> {{data.total_experience}}</h5>
        <div class="box p-3 w-50 mt-2" style="textAlign:left;">
          <h5 class="colored">Past Experience:</h5>
          <p v-for="(val, ix) in data.experience" :key="ix">
            {{val}}
          </p>
        </div>
        <h5 v-if="data.college_name !== null || data.degree !== null" class="colored">Education:</h5>
        <h5 v-if="data.college_name !== null">{{data.college_name}}</h5>
        <h5 v-if="data.degree !== null">{{data.degree.toString()}}</h5>
      </div>
    <div class="main">
      <h4>Company</h4>
      <p class="mt-3 box" > {{data.cv_feature_store.company_name.text}} >
        <span>
          <span class="colored" v-if="data.cv_feature_store.company_name.matched === null">No Match</span>
          <span  class='highlight-alt' v-else>{{data.cv_feature_store.company_name.matched}}</span>
        </span>
        <span style="padding:10px"></span>
        <span class="highlight">{{data.cv_feature_store.company_name.weighted_score}}</span>
      </p>
      <h4>Designation</h4>
      <p class="mt-3 box" >{{data.cv_feature_store.designation.text}} >
        <span >
          <span class="colored" v-if="data.cv_feature_store.designation.matched === null">No Match</span>
          <span  class='highlight-alt' v-else>{{data.cv_feature_store.designation.matched}}</span>
        </span>
        <span style="padding:10px"></span>
        <span class="highlight">{{data.cv_feature_store.designation.weighted_score}}</span>
      </p>
      <h4>Location</h4>
      <p class="mt-3 box" >{{data.cv_feature_store.location.text}} >
        <span >
          <span class="colored" v-if="data.cv_feature_store.location.matched === null">No Match</span>
          <span class='highlight-alt' v-else>{{data.cv_feature_store.location.matched}}</span>
        </span>
        <span style="padding:10px"></span>
         <span class="highlight">{{data.cv_feature_store.location.weighted_score}}</span>
      </p>
      <br />
      <h4>Requirements</h4>
      <p class="mt-3 box" v-for="(value, propertyName) in data.cv_feature_store.requirements" :key="propertyName">
          {{ value.line }} >
          <span>
            <span class="colored" v-if="value.matched === null">No Match</span>
            <span class='highlight-alt' v-else>{{value.matched}}</span>
          </span> 
          <span style="padding:10px"></span>
          <span class="highlight">{{value.weighted_score}}</span>
      </p>
      <br />
      <h4 >Responsibilities</h4>
       <p class="mt-3 box" v-for="(value, propertyName) in data.cv_feature_store.responsibilities" :key="propertyName">
          {{ value.line }} >
          <span >
            <span class="colored" v-if="value.matched === null">No Match</span>
            <span class='highlight-alt' v-else>{{value.matched}}</span>
          </span> 
          <span style="padding:10px"></span>
          <span class="highlight">{{value.weighted_score}}</span>
      </p>
      <br />
    </div>
      <Loading v-if="loading"/>
    </div>
  </b-container>
</template>

<script>
import Progress from "@/components/Progress";
import Loading from "@/components/Loading";
import axios from"axios";
export default {
  name: "ReportIndividual",
  components: {
    Progress,
    Loading,
  },
  data() {
    return {
      loading: true,
      data: {},
    }
  },
  mounted() {
      let cvd = this.$route.params.cid;
      let self = this;
      axios.get("https://api-cynor.syncfire.com.au/get-cv?id="+cvd)
      .then(function (response) {
          console.log(response.data);
          self.loading = false;
          self.data = response.data;
        })
        .catch(function (response) {
          console.log(response);
        });
  },
  methods: {

  }
};
</script>

<style scoped>
h1,
h4 {
  color: #3f20f3;
}
.main {
  width: 80%;
  text-align: left;
  margin: 20px auto;
}
.colored{
  color: #3f20f3;
}
p {
  margin: 2px;
}
.box {
  border: 1px solid #3f20f3;
  border-radius: 20px;
  padding:20px;
  width: 70%;
  text-align: center;
}
.highlight-alt {
  background-color: #3f20f3;
  padding: 0 5px;
  color: white;
  border-radius: 10px;
}
.highlight {
  border: 1px solid #3f20f3;
  padding: 0 5px;
  color: #3f20f3;
  border-radius: 10px;
}
</style>