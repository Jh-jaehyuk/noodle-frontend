<template>
  <div class="home-main-body">
      <div class="content-area">
        <div class="title-area">
          <transition name="fade-down">
            <p class="main-title" :class="{ 'visible': showElements }">NOODLE</p>
          </transition>
          <div>
            <p class="sub-title">{{ typedText }}<span class="cursor">_</span></p>
          </div>
          <transition name="fade">
            <div class="sub-introduce" :class="{ 'visible': showElements }">
              <p>AI를 활용하여 업무의 효율을 높이는 세상</p>
            </div>
          </transition>
        </div>
        <!-- <SearchBox class="searchbox" :class="{ 'fade-in': showElements }" /> -->
      </div>
      <RecentReport class="recentreport" :class="{ 'fade-in': showElements }" />
      <ScrollAnimation class="scrollanimation" :class="{ 'fade-in': showElements }" @click="goToHomeSecond"/>
  </div>
</template>


<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
// import SearchBox from './SearchBox.vue';
import RecentReport from './RecentReport.vue';
import ScrollAnimation from './ScrollAnimation.vue'

export default {
  name: 'HomeMain',
  components: {
    // SearchBox,
    RecentReport,
    ScrollAnimation
  },
  data() {
    return {
      fullText: 'Use Your Noodle!',
      typedText: '',
      typeIndex: 0,
      showElements: false,
    };
  },
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      if (this.typeIndex < this.fullText.length) {
        this.typedText += this.fullText.charAt(this.typeIndex);
        this.typeIndex++;
        setTimeout(this.typeText, 80);
      } else {
        this.showElements = true;
        this.$nextTick(() => {
          AOS.refresh();
        });
      }
    },
    goToHomeSecond() {
      this.$emit('scroll-to-home-second');
    },
  },
};
</script>

<style scoped>
.home-main-body {
  background-image: url('~@/assets/images/fixed/main.png');
  background-size: auto 100%;
  background-position: 0% center;
  background-repeat: repeat-x;
  animation: moveBackgroundX 30s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - var(--navigation-bar-height));
  width: 100vw;
  overflow: hidden;
  position: relative;
}

@keyframes moveBackgroundX {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 100% center;
  }
}

.content-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50vh;
  width: 40%;
  margin-left: 10%;
  margin-top: 20vh;
}

.title-area {
  height: 30vh;
  width: 100%;
  text-align: left;
  /* margin-bottom: 0; */
}

.main-title {
  color: rgb(255, 240, 30);
  font-size: 140px;
  animation: fadeDown 0.8s ease-out;
  line-height: 0.8;
  margin: 0;
  padding: 0;
}

.sub-title {
  color: #ffffff;
  font-size: 60px;
  margin: 0;
  padding: 0;
}

.sub-introduce {
  color: #ffffff;
  font-size: 16px;
  margin: 0;
  padding: 0;
}

.cursor {
  display: inline-block;
  width: 0.5em;
  animation: blink 0.7s infinite;
  font-weight: bold;
}

@keyframes blink {
   0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-down-enter-active {
  transition: all 0.8s ease-out;
}
.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.searchbox, .recentreport, .main-title, .sub-introduce, .scrollanimation {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.searchbox.fade-in, .recentreport.fade-in, .main-title.visible, .sub-introduce.visible, .scrollanimation.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.scrollanimation {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 6s ease 0s infinite;
  animation-delay: 5s;
}

@keyframes bounce {
  0%, 10%, 20%, 95%, 100% {
    transform: translateY(0);
  }
  5%, 15% {
    transform: translateY(-10px);
  }
}
</style>