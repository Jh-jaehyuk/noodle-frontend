<template>
  <div class="home-second">
    <div class="home-second-body">
      <div class="title-container">
        <p class="title">AI를 활용하여 업무의 효율을 높이는 세상.</p>
        <p class="sub-title"><span class="NOODLE-span">NOODLE</span>이 고객에게 경험시켜드리고자 하는 것은 바로 이런 편리함입니다.</p>
      </div>
      <div class="content-area">
        <div class="content-container">
          <div class="content-title" data-aos="fade-up" data-aos-offset="400">
            <p><span class="NOODLE-span">NOODLE</span>에서는</p>
            <p>이런 서비스를 제공합니다.</p>
          </div>
          <div class="image-container">
            <div class="image-card-container">
              <v-card data-aos="fade-up" data-aos-anchor=".content-title" data-aos-offset="400">
                <div class="image-card">
                  <v-img src="/fixed/github_logo2.png" cover>
                    <div class="gradient-overlay"></div>
                  </v-img>
                  <div class="text-container">
                    <div class="image-card-title">
                      <p>GitHub 연동</p>
                    </div>
                    <div class="image-card-text">
                      <p>GitHub와 연동을 통해 별도의 회원가입 없이 GitHub 아이디만으로 프로젝트를 관리할 수 있습니다.</p>
                    </div>
                  </div>
                </div>
              </v-card>
              <v-card data-aos="fade-up" data-aos-anchor=".content-title" data-aos-delay="200" data-aos-offset="400">
                <div class="image-card">
                  <v-img src="/fixed/search.jpg" cover>
                    <div class="gradient-overlay"></div>
                  </v-img>
                  <div class="text-container">
                    <div class="image-card-title">
                      <p>생성된 보고서 검색</p>
                    </div>
                    <div class="image-card-text">
                      <p>생성한 프로젝트 보고서를 쉽게 검색하여 확인할 수 있습니다.</p>
                    </div>
                  </div>
                </div>
              </v-card>
              <v-card data-aos="fade-up" data-aos-anchor=".content-title" data-aos-delay="400" data-aos-offset="400">
                <div class="image-card">
                  <v-img src="/fixed/create_backlog.jpg" cover>
                    <div class="gradient-overlay"></div>
                  </v-img>
                  <div class="text-container">
                    <div class="image-card-title">
                      <p>Backlog 생성</p>
                    </div>
                    <div class="image-card-text">
                      <p>Github의 Repository와 Branches 별로 Backlog를 자동 생성 및 관리할 수 있습니다.</p>
                    </div>
                  </div>
                </div>
              </v-card>
              <v-card data-aos="fade-up" data-aos-anchor=".content-title" data-aos-delay="600" data-aos-offset="400">
                <div class="image-card">
                  <v-img src="/fixed/create_report.jpg" cover>
                    <div class="gradient-overlay"></div>
                  </v-img>
                  <div class="text-container">
                    <div class="image-card-title">
                      <p>Project Report 생성</p>
                    </div>
                    <div class="image-card-text">
                      <p>개발자들의 업무 생산성을 높이기 위해 Project Report의 초안 작성 및 관리를 도와드립니다.</p>
                    </div>
                  </div>
                </div>
              </v-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';

export default defineComponent({
  name: 'HomeSecond',
  setup() {
    onMounted(() => {
      AOS.init({
        duration: 1000,
        once: false,
      })
    })
  }
});
</script>


<style scoped>
.home-second {
  width: 100%;
  height: 90vh;
  background-color: #080808;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-second-body {
  width: 70%;
  height: 100%;
  background-color: #080808;
}

.title-container {
  width: 100%;
  height: 25%;
  background-color: #080808;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* padding-bottom: 50px; */
}

.title-container p {
  color: #ffffff;
}

.title {
  font-size: 6vh;
  font-weight: bold;
}

.sub-title {
  font-size: 2.5vh;
  font-weight: bold;
}

.content-area {
  width: 100%;
  height: 70%;
  background-color: #080808;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* padding-bottom: 150px; */
}

.content-container {
  width: 100%;
  height: 100%;
  background-color: #080808;
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
  /* justify-content: flex-end; */
  justify-content: center;
  gap: 10px;
}

.content-title {
  width: 100%;
  height: 10%;
  background-color: #080808;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5%;
}

.content-title p {
  color: #ffffff;
  font-size: 2.5vh;
  font-weight: bold;
}

.image-container {
  width: 100%;
  height: 60%;
  background-color: #080808;
}

.image-card-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
}

.v-card {
  width: 40%;
  height: 90%;
  border-radius: 25px;
  background-color: #080808;
}

.image-card {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 25px;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 40%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0.8) 60%,
    rgba(0, 0, 0, 0.9) 70%,
    rgba(0, 0, 0, 1) 80%
  );
}

.text-container {
  position: absolute;
  top: 70%;
  left: 5%;
  right: 5%;
  transform: translateY(-50%);
  padding: 2vh;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2vh;
}

.image-card-title {
  color: #fff;
  font-size: 2.3vh;
  font-weight: bold;
  margin-bottom: 1vh;
}

.image-card-text p {
  color: #fff;
  font-size: 1.6vh;
  margin: 0;
  line-height: 1.6;
  opacity: 0.9;
}

.v-img {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  border-radius: 25px;
}

.image-card:hover .v-img {
  transform: scale(1.05);
}

.NOODLE-span {
  color: rgb(255, 240, 30);
}
</style>