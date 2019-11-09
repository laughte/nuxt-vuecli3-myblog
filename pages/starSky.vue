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
  overflow:  hidden;
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
    <!-- <div class="heidong"></div> -->
    <div
      class="animatedstar"
      :style="{width:Math.random()*3+'px',
    height:Math.random()*3+'px',
    position:'absolute',
    left:Math.random()*1920+'px',
    top:Math.random()*850+'px',
    background:'rgb'+'('+Math.round(Math.random() * 100 + 155)+','+Math.round(Math.random() * 100 + 155)+','+Math.round(Math.random() * 100 + 155)+')',
    filter:'blur('+Math.random()+'px)',
       animationName:'changeposition',
	animationDuration:'8s',
	animationTimingFunction:'ease-in',
	animationDelay:i*1+'s',
	animationIterationCount:'infinite',


    }"
      :key="i+'流星哦'"
      v-for="i in volume3*1"
    ></div>

    <div
      class="star"
      :style="{width:Math.random()*3+'px',
    height:Math.random()*3+'px',
    position:'absolute',
    left:Math.random()*1920+'px',
    top:Math.random()*850+'px',
    background:'rgb'+'('+Math.round(Math.random() * 100 + 155)+','+Math.round(Math.random() * 100 + 155)+','+Math.round(Math.random() * 100 + 155)+')',
    animationName:'starlight',
	animationDuration:'2s',
	animationTimingFunction:'linear',
	animationDelay:i*0.1+'s',
	animationIterationCount:'infinite',
	animationDirection:'alternate',
	animationPlayState:'running',

    }"
      :key="i+'sdfoejfasjfoasdf'"
      v-for="i in volume*12"
    ></div>

    <div
      :style="{width:Math.random()+'px',
    height:Math.random()+'px',
    position:'absolute',
    left:Math.random()*1920+'px',
    top:Math.random()*850+'px',
    background:'rgb'+'('+Math.round(Math.random() * 100 + 155)+','+Math.round(Math.random() * 100 + 155)+','+Math.round(Math.random() * 100 + 155)+')',
    filter:'blur('+Math.random()+'px)'

    }"
      :key="i"
      v-for="i in 300"
    ></div>

    <div
      class="star"
      :style="{width:Math.random()*210+'px',
    height:Math.random()*210+'px',
    position:'absolute',
    left:Math.random()*1920+'px',
    top:Math.random()*850+'px',
    background:'rgb'+'('+Math.round(Math.random() * 100 + 155)+','+Math.round(Math.random() * 100 + 155)+','+Math.round(Math.random() * 100 + 155)+')',
    filter:'blur(200px)'


    }"
      :key="i+'什么鬼'"
      v-for="i in volume1*1"
    ></div>

    <div
      class="star"
      :style="{width:Math.random()*4+'px',
    height:Math.random()*4+'px',
    position:'absolute',
    left:Math.random()*1920+'px',
    top:Math.random()*850+'px',
    background:'rgb'+'('+Math.round(Math.random() * 100 + 155)+','+Math.round(Math.random() * 100 + 155)+','+Math.round(Math.random() * 100 + 155)+')',
    animationName:'starlight',
	animationDuration:'3s',
	animationTimingFunction:'linear',
	animationDelay:i*0.1+'s',
	animationIterationCount:'infinite',
	animationDirection:'alternate',
	animationPlayState:'running',
filter:'blur(1px)'
    }"
      :key="i+'我好多撒旦发射'"
      v-for="i in 200"
    ></div>

    <div
      class="star"
      :style="{width:Math.random()*120+'px',
    height:Math.random()*120+'px',
    position:'absolute',
    left:Math.random()*1920+'px',
    top:Math.random()*850+'px',
    background:'rgb'+'('+Math.round(Math.random() * 100 + 155)+','+Math.round(Math.random() * 100 + 155)+','+Math.round(Math.random() * 100 + 155)+')',
    filter:'blur(90px)'
    }"
      :key="i+'好烦哦'"
      v-for="i in volume2*2"
    ></div>
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
  activated() {
    if(this.$route.fullPath ==='/starSky' ){
      this.$vuetify.theme.dark=true
    }
  },
  beforeCreate() {

  }
}
</script>



