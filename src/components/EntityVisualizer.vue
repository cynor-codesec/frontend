<template>
  <span v-html="parsedString"></span>
</template>

<script>
export default {
  props: ["text", "ents"],
  data(){
      return {
          parsedString: ""
      }
  },
  methods: {
    insertToString(pos, line, word) {
      return line.substring(0, pos + 1) + word + line.substring(pos);
    },
  },
  mounted() {
    let parsedString = this.text;
    for (var i = 0; i < this.ents.length; i++) {
      let text = this.ents[i][0]
      let enitity = this.ents[i][1];
      let start = parsedString.search(text);
      if (enitity === "rangeExp" || enitity === "minExp" || enitity === "genExp") {
        let end = start + text.length;
        if (end == (parsedString.length -1)) {end = end +1}
        if (start !== 0) {
          
          parsedString = this.insertToString(end, parsedString, "</span>");
          parsedString = this.insertToString(start-1, parsedString, "<span style='color:red;'>");
        } else {
          parsedString = this.insertToString(end, parsedString, "</span>");
          parsedString = "<span style='color:red;'>" + parsedString
        }
      } else {
        let end = start + text.length;
        if (end == (parsedString.length -1)) {end = end +1}
        if (start !== 0) {
          parsedString = this.insertToString(end, parsedString, "</span>");
          parsedString = this.insertToString(start-1, parsedString, "<span style='color:green;textDecoration:underline'>");
        } else {
          parsedString = this.insertToString(end, parsedString, "</span>");
          parsedString = "<span style='color:green'>" + parsedString
        }
      }
    }
    this.parsedString = parsedString;
  },
};
</script>

