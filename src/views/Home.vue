<template>
  <b-container class="bv-example-row">
    <b-row class="justify-content-md-center">
      <b-col col>
        <h1 class="mt-4">Cynor</h1>
      </b-col>
    </b-row>
    <Progress step=1 />
    <b-row>
      <div id="upload">
          <img src="@/assets/upload.png" alt="upload icon"/>
          
          <h2 class="pt-3">Upload JD</h2>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import Progress from "@/components/Progress"
export default {
  name: "Home",
  components: {
    Progress,
  },
};
</script>

<style scoped>
h1, h2{
  color: #3F20F3;
}
#upload {
  width: 80%;
  margin: 40px auto;
  border: 1px solid #3F20F3;
  border-radius: 25px;

}
#upload {
  padding: 170px 0;
}
</style>
