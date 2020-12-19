<template>
  <div id="d3Map"></div>
</template>
<script>
import * as d3 from 'd3'
export default {
  name: 'Map',
  data() {
    return {
      width: 1280,
      height: 720,
      scale: 600,
      url: 'https://geo.datav.aliyun.com/areas_v2/bound/100000_full.json',
    }
  },
  mounted() {
    this.$nextTick(() => {})
    const svg = d3
      .select('#d3Map')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
    const projection = d3
      .geoMercator()
      .scale(this.scale)
      .center([105, 38])
      .translate([this.width / 2, this.height / 2])
    const path = d3.geoPath().projection(projection)

    const color = d3.scaleOrdinal(d3.schemeCategory10)
    // const color = d3.schemeCategory10

    d3.json(this.url).then(res => {
      svg
        .selectAll('g')
        .data(res.features)
        .enter()
        .append('g')
        .append('path')
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('opacity', 0.6)
        .attr('fill', function (d, i) {
          return color(i)
        })
        .attr('d', path)
        .on('mouseover', function () {
          d3.select(this).attr('opacity', 1)
        })
        .on('mouseout', function () {
          d3.select(this).attr('opacity', 0.6)
        })
    })
  },
}
</script>
<style lang="scss" scoped>
#d3map {
  margin: 0 auto;
}
</style>