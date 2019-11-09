<style>
.star {
  border-radius: 50%;
}
#star {
  position: absolute;
  left: 0;
  background: black;
  height: 85vh;
  width: 100vw;
  overflow: hidden;
}
@keyframes starlight {
  from {
    opacity: 0;
  }
  to {
    background: 1;
  }
}
/* .animatedstar {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  border-radius: 50%;
  background: white;
  animation: changeposition 2s linear infinite;
} */

.heidong {
  position: absolute;
  top: 300px;
  left: 560px;
  width: 20px;
  height: 50px;
  background: rgb(255, 253, 253);
  border-radius: 50%;
  animation: cycled 10s infinite cubic-bezier(0.5, 0.05, 1, 0.5);
  filter: blur(20px);
}

@keyframes cycled {
  from {
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes changeposition {
  0% {
    opacity: 0;
    /* top: 0px;
    left: 0px; */
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    top: 800px;
  }
}
/* @keyframes meteor {
  from {
    opacity: 0;
  }
  to {
    background: 1;
    top: 1200px;
  }
} */
</style>


<template>
  <v-card id="star" dark>
    <v-card-actions>
      <v-slider v-model="volume" label="星星"></v-slider>
      <v-slider v-model="volume1" label="星云"></v-slider>
      <v-slider v-model="volume2" label="星晕"></v-slider>
      <v-slider v-model="volume3" label="流星"></v-slider>
    </v-card-actions>

<svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 313.97 200">
  <defs>
    <filter id="f1" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
    </filter>
  </defs>

  <circle v-for="i in 5000"
          :key="i" :cx="Math.random()*1920"
          :cy="Math.random()*800"
          :r="Math.random()*10"
          filter="url(#f1)"
          :fill="'rgb('+ Math.round(Math.random() * 100 + 155)   +','+  Math.round(Math.random() * 100 + 155)+ ','+Math.round(Math.random() * 100 + 155)+')'"/>
<!--  <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red"/>-->

</svg>

  </v-card>
</template>

<script>
export default {
  data() {
    return {
      volume: 0,
      volume1: 0,
      volume2: 0,
      volume3: 10
    }
  },
  methods: {

  }
}
</script>



