<template>
  <div id="map">
    <div class="search">
      <input v-model="wordKey" type="textbox" style="width: 85px" placeholder="地名">
      <input v-model="regionKey" type="textbox" style="width: 85px" placeholder="城市">
      <input type="button" value="查询" @click="searchKeyword">
    </div>
  </div>
</template>

<script>
import maps from 'qqmap'
export default {
  name: 'Map',
  props: {
    markerData: {
      type: Object,
      default: function() {
        return {
          lat: null,
          lng: null
        }
      }
    }
  },
  data() {
    return {
      map: null,
      searchService: null,
      infoMarkers: [],
      marker: null,
      regionKey: '',
      wordKey: ''
    }
  },
  watch: {
    markerData: {
      handler(val) {
        if (val.lat && val.lng) {
          const markerLatLng = new maps.LatLng(val.lat, val.lng)
          this.initMarker(markerLatLng)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      maps.init('OKVBZ-HA4CW-NOCRU-R742U-J3COH-5VBJM', () => {
        const center = new maps.LatLng(28.68202, 115.85794)
        const myOptions = {
          zoomControl: false,
          panControl: false,
          zoom: 16,
          center,
          mapTypeId: maps.MapTypeId.ROADMAP
        }
        this.map = new maps.Map(
          document.getElementById('map'),
          myOptions
        )
        // 添加监听事件  获取鼠标点击事件
        maps.event.addListener(this.map, 'click', (event) => {
          this.initMarker(event.latLng)
        })
        this.initSearch()
        if (this.markerData.lat && this.markerData.lng) {
          const markerLatLng = new maps.LatLng(this.markerData.lat, this.markerData.lng)
          this.initMarker(markerLatLng)
        }
      })
    },
    initSearch() {
      var latlngBounds = new maps.LatLngBounds()
      this.searchService = new maps.SearchService({
        complete: (results) => {
          var pois = results.detail.pois
          if (pois) {
            for (var i = 0, l = pois.length; i < l; i++) {
              var poi = pois[i]
              latlngBounds.extend(poi.latLng)
              var marker = new maps.Marker({
                map: this.map,
                position: poi.latLng
              })
              marker.setTitle(i + 1)
              this.infoMarkers.push(marker)
            }
          }
          this.map.fitBounds(latlngBounds)
        }
      })
    },
    initMarker(latLng) {
      const url = 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png'
      var anchor = new maps.Point(12, 34)
      var size = new maps.Size(42, 68)
      var origin = new maps.Point(0, 0)
      const scaleSize = new maps.Size(25, 34)
      if (this.marker) {
        this.marker.setPosition(latLng)
      } else if (latLng) {
        this.marker = new maps.Marker({
          icon: new maps.MarkerImage(url, size, origin, anchor, scaleSize),
          title: '公司地址',
          position: latLng,
          map: this.map
        })
      }
      this.map.setCenter(latLng)
      const lat = latLng.getLat()
      const lng = latLng.getLng()
      this.$emit('getLatLng', { lat, lng })
    },
    searchKeyword() {
      this.clearOverlays(this.infoMarkers)
      this.searchService.setLocation(this.regionKey)
      this.searchService.search(this.wordKey)
    },
    // 清除地图上的marker
    clearOverlays(overlays) {
      var overlay = []
      while (overlay = overlays.pop()) {
        overlay.setMap(null)
      }
    }
  }
}
</script>

<style scoped lang="scss">
 #map {
     width: 100%;
     height: 100%;
   position: relative;
   .search {
     position: absolute;
     top: 0px;
     right: 92px;
     z-index: 9;
   }
 }
</style>
