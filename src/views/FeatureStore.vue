<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col col>
        <h1 class="mt-4">Cynor</h1>
      </b-col>
    </b-row>
    <Progress step="2" />
    <b-row class="justify-content-md-center" v-if="!loading">
      <br />
      <h2>Feature Store:</h2>
      <b-row id="general" style="marginTop: 20px">
        <b-col>
          <h4>Company</h4>
          <div class="box">
            <input type="text" :value="feature_store.company_name.text" />
            <b-row class="weight align-items-md-center">
              <b-col md="10">
                <Slider
                  class="colored"
                  v-model="feature_store.company_name.weight"
                  :min="-10"
                  :max="10"
                  showTooltip="drag"
                />
              </b-col>
              <b-col md="2">
                <p class="mt-4 mb-4">{{ feature_store.company_name.weight }}</p>
              </b-col>
            </b-row>
            <p class="faded">
              Sets preference towards ex or present employees of your company.
            </p>
          </div>
        </b-col>
        <b-col>
          <h4>Designation</h4>
          <div class="box">
            <input type="text" :value="feature_store.designation.text" />
            <b-row class="weight align-items-md-center">
              <b-col md="10">
                <Slider
                  class="colored"
                  v-model="feature_store.designation.weight"
                  :min="-10"
                  :max="10"
                  showTooltip="drag"
                />
              </b-col>
              <b-col md="2">
                <p class="mt-4 mb-4">{{ feature_store.designation.weight }}</p>
              </b-col>
            </b-row>
            <p class="faded">
              Sets preference towards candidates with this specific designation.
            </p>
          </div>
        </b-col>
        <b-col>
          <h4>Location</h4>
          <div class="box">
            <input type="text" :value="feature_store.location.text" />
            <b-row class="weight align-items-md-center">
              <b-col md="10">
                <Slider
                  class="colored"
                  v-model="feature_store.location.weight"
                  :min="-10"
                  :max="10"
                  showTooltip="drag"
                />
              </b-col>
              <b-col md="2">
                <p class="mt-4 mb-4">{{ feature_store.location.weight }}</p>
              </b-col>
            </b-row>
            <p class="faded">
              Sets preference towards candidates who are located in this
              location.
            </p>
          </div>
        </b-col>
      </b-row>

      <b-row id="requirements" style="marginTop: 35px" class="box-2">
        <h4>Requirements</h4>
        <b-row >
          <b-col md="3" v-for="key in Object.keys(feature_store.requirements)" :key="key">
            <div class="box mt-3">
              <EntityVisualizer 
                :text="feature_store.requirements[key].line"
                :ents="feature_store.requirements[key].text"
                 />
              <b-row class="weight align-items-md-center">
                <b-col md="10">
                  <Slider
                    class="colored"
                    v-model="feature_store.requirements[key].weight"
                    :min="-10"
                    :max="10"
                    showTooltip="drag"
                  />
                </b-col>
                <b-col md="2">
                  <p class="mt-4 mb-4">{{ feature_store.requirements[key].weight }}</p>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-row>

        <b-row id="responsibilities" style="marginTop: 35px; marginBottom: 10px" class="box-2">
        <h4>Responsibilities</h4>
        <b-row>
          <b-col md="3" v-for="key in Object.keys(feature_store.responsibilities)" :key="key">
            <div class="box mt-3">
              <span>{{feature_store.responsibilities[key].line}}</span>
              <b-row class="weight align-items-md-center">
                <b-col md="10">
                  <Slider
                    class="colored"
                    v-model="feature_store.responsibilities[key].weight"
                    :min="-10"
                    :max="10"
                    showTooltip="drag"
                  />
                </b-col>
                <b-col md="2">
                  <p class="mt-4 mb-4">{{ feature_store.responsibilities[key].weight }}</p>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-row>
      <b-button @click="submit" variant="primary" class="btn"
            >Next!</b-button
          >
    </b-row>
    <Loading v-if="loading" />
  </b-container>
</template>

<script>
import Progress from "@/components/Progress";
import Loading from "@/components/Loading";
import EntityVisualizer from "@/components/EntityVisualizer";

import Slider from "@vueform/slider/dist/slider.vue2.js";
export default {
  name: "FeatureStore",
  components: {
    Progress,
    Loading,
    Slider,
    EntityVisualizer
  },
  data() {
    return {
      loading: false,
      feature_store: {
        company_name: {
          end: 16,
          line: "Axon digital pvt. Itd. Web Backend Developer",
          line_ix: 0,
          start: 5,
          text: "Axon digital pvt",
          weight: 1,
        },
        designation: {
          end: 10,
          line: "Axon digital pvt. Itd. Web Backend Developer",
          line_ix: 0,
          start: 8,
          text: "Backend Developer",
          weight: 1,
        },
        location: {
          end: 21,
          line: "Location: Maharashtra, India",
          line_ix: 1,
          start: 10,
          text: "Maharashtra",
          weight: 1,
        },
        requirements: {
          skill0: {
            end: [3, 5, 7],
            line: "Bachelor's degree in CSE or MCA",
            line_ix: 0,
            start: [0, 4, 6],
            text: [
              ["Bachelor's degree", "compoundKw"],
              ["CSE", "genKw"],
              ["MCA", "genKw"],
            ],
            weight: 1,
          },
          skill1: {
            end: [7, 9],
            line: "At Least 3 to 5 years experience in NodeJs.",
            line_ix: 1,
            start: [2, 8],
            text: [
              ["3 to 5 years experience", "rangeExp"],
              ["NodeJs", "genKw"],
            ],
            weight: 1,
          },
          skill2: {
            end: [5, 7],
            line: "At Least 2 years experience in expressJs.",
            line_ix: 2,
            start: [0, 6],
            text: [
              ["At Least 2 years experience", "minExp"],
              ["expressJs", "genKw"],
            ],
            weight: 1,
          },
          skill3: {
            end: [7],
            line: "Must know to write tests in Mocha:",
            line_ix: 3,
            start: [6],
            text: [["Mocha", "genKw"]],
            weight: 1,
          },
          skill4: {
            end: [4, 8],
            line: "Must have good communication skills and experience working in teams",
            line_ix: 4,
            start: [2, 6],
            text: [
              ["good communication", "compoundKw"],
              ["experience working", "compoundKw"],
            ],
            weight: 1,
          },
          skill5: {
            end: [3],
            line: "have relevant skills and interests:",
            line_ix: 5,
            start: [1],
            text: [["relevant skills", "compoundKw"]],
            weight: 1,
          },
        },
        responsibilities: {
          repsonsibility0: {
            line: "Building backend modules for several backend projects.",
            line_ix: 0,
            text: "Building backend modules for several backend projects.",
            weight: 1,
          },
          repsonsibility1: {
            line: "Maintain high coding standards and practices to deliver secure , scalable, optimized, and",
            line_ix: 1,
            text: "Maintain high coding standards and practices to deliver secure , scalable, optimized, and",
            weight: 1,
          },
          repsonsibility2: {
            line: "exceptional WordPress products from start to finish. Always do extensive research to",
            line_ix: 2,
            text: "exceptional WordPress products from start to finish. Always do extensive research to",
            weight: 1,
          },
          repsonsibility3: {
            line: "build innovative solutions with a perfect user experience. Write test cases for all the",
            line_ix: 3,
            text: "build innovative solutions with a perfect user experience. Write test cases for all the",
            weight: 1,
          },
          repsonsibility4: {
            line: "code you develop. Planning and issue management via Jira. Respect timelines and",
            line_ix: 4,
            text: "code you develop. Planning and issue management via Jira. Respect timelines and",
            weight: 1,
          },
          repsonsibility5: {
            line: "communicate progress proactively: We are a remote team, so proactive communication",
            line_ix: 5,
            text: "communicate progress proactively: We are a remote team, so proactive communication",
            weight: 1,
          },
          repsonsibility6: {
            line: "is essential.",
            line_ix: 6,
            text: "is essential.",
            weight: 1,
          },
        },
      },
    };
  },
  methods: {
    submit() {
      this.loading = true;
    }
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style scoped>
h1,
h2,
h4 {
  color: #3f20f3;
}
input {
  border: 1px solid #3f20f3;
  border-radius: 5px;
  padding-left: 10px;
}
.colored {
  color: #3f20f3;
  --slider-connect-bg: #3f20f3;
  --slider-tooltip-bg: #3f20f3;
  --slider-handle-ring-color: #e7e3ff;
}
.box {
  border: 1px solid #3f20f3;
  border-radius: 15px;
  padding-top: 25px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
}
.weight {
  width: 90%;
  margin: 0 auto;
}
.slider-handle {
  opacity: 0.9;
  background: #06b0da;
  cursor: pointer;
}
.box-2{
  background-color: #f5f5fabb;
  border-radius:20px;
  padding: 20px;
  margin: 0 auto;
}
.btn {
  width: 50%;
  margin: 15px auto;
}
.faded{
  color: #575656;
}
</style>