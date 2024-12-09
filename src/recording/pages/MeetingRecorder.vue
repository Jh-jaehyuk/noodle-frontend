<template>
  <v-container class="recoder-container" fluid>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 70%; height: 100%;">
      <h1 style="font-size: 40px; width: 100%; min-width: 100%; text-align: center;">고객님의 회의 내용을 <span style="color: rgb(255, 240, 30); font-size: 40px;">NOODLE</span>이 정리해드릴게요.</h1>
      <v-icon class="recoder-icon" size="280">mdi-text-box-check-outline</v-icon> 
      <div class="recoder-button-container">
        <div style="width: 20%; height: 70%; position: relative;">
            <!-- 녹음 시간 표시 -->
            <div v-if="isRecording" class="recording-time" style="color: red;">
              녹음 시간: {{ formatTime(recordingTime) }}
              <v-progress-circular v-if="isRecording" indeterminate color="red" size="40" class="my-3"></v-progress-circular>
            </div>
          <div 
            :class="['recording-button', isRecording ? 'red' : 'primary']" 
            @click="toggleRecording"
            role="button"
            tabindex="0">
            <div class="recording-button-icon">
              <v-icon size="150" :color="isRecording ? 'white' : 'red'">
                {{ isRecording ? 'mdi-stop' : 'mdi-microphone-outline' }}
              </v-icon> 
            </div>
            <p class="recording-button-text">{{ isRecording ? '녹음 중지' : '녹음 시작' }}</p>
          </div>
        </div>
        

          <div
            class="download-button" 
            v-if="recordingComplete == true"  
            role="button"
            tabindex="0"
            @click="downloadRecording">
            <div class="download-button-icon">
              <v-icon size="150">
                mdi-download
              </v-icon> 
            </div>
            <p class="download-button-text">녹음 파일 다운로드</p>
          </div>

          <div 
            class="analysis-button" 
            v-if="recordingComplete"  
            role="button"
            tabindex="0"
            @click="analyzeRecording">
            <div class="analysis-button-icon">
              <v-icon size="150">
                mdi-robot
              </v-icon> 
            </div>
            <p class="analysis-button-text">녹음 파일 분석</p>
          </div>

          <v-alert v-if="uploadSuccess" type="success" class="mt-3">
            파일이 S3에 업로드되었습니다!
          </v-alert>
          <v-alert v-if="uploadError" type="error" class="mt-3">
            파일 업로드 중 오류가 발생했습니다.
          </v-alert>
        </div>
      </div>
  </v-container>
</template>

<script>
import { s3Client, env } from '@/utility/awsConfig'
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { mapActions } from 'vuex';

const recordingModule = 'recordingModule'

export default {
  name: 'MeetingRecorder',
  data() {
    return {
      isRecording: false,
      recordingComplete: false,
      recordingTime: 0,  // 녹음 시간 (초 단위)
      mediaRecorder: null,
      audioChunks: [],
      uploadSuccess: false,
      uploadError: false,
      audioBlob: null,
      recordingInterval: null,
      MAX_RECORDING_TIME: 300  // 최대 녹음 시간 (5분 = 300초)
    }
  },
  methods: {
    ...mapActions(recordingModule, ["requestGenerateMeetingRecordingSummary", "requestGetMeetingRecordingSummary"]),
    async startRecording() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => {
          this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          this.recordingComplete = true;
          clearInterval(this.recordingInterval);
          this.recordingTime = 0;
        };

        this.audioChunks = [];
        this.mediaRecorder.start();
        this.isRecording = true;

        // 녹음 시간 업데이트 시작
        this.recordingInterval = setInterval(() => {
          this.recordingTime += 1;

          // 최대 시간 도달 시 자동 녹음 중지
          if (this.recordingTime >= this.MAX_RECORDING_TIME) {
            this.stopRecording();
          }
        }, 1000);

      } catch (error) {
        console.error('녹음 시작 오류:', error);
      }
    },
    stopRecording() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
      }
      this.isRecording = false;
    },
    toggleRecording() {
      if (this.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60).toString().padStart(2, '0');
      const seconds = (time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    },
    downloadRecording() {
      if (!this.audioBlob) return;

      const url = URL.createObjectURL(this.audioBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `meeting_recording_${Date.now()}.webm`;
      link.click();
      URL.revokeObjectURL(url);
    },
    async analyzeRecording() {
      console.log("analyzeRecording()")
      if (!this.audioBlob) return;

      const fileName = `meeting_recording_${Date.now()}.webm`;

      const params = {
        Bucket: env.s3.S3_BUCKET_NAME,
        Key: fileName,
        Body: this.audioBlob,
        ContentType: 'audio/webm',
      };

      try {
        console.log('Upload file with params:', params)
        await s3Client.send(new PutObjectCommand(params))
        console.log(`Upload ${fileName} to S3 successfully.`)
      } catch (error) {
        console.error('Error uploading file:', error)
      }

      const userToken = localStorage.getItem('userToken')
      const payload = { userToken: userToken, fileName: fileName }
      const res = await this.requestGenerateMeetingRecordingSummary(payload)
      console.log("requestGenerateMeetingRecordingSummary status:", res)
      const meetingRecordingSummary = await this.requestGetMeetingRecordingSummary({ userToken: userToken })
      console.log("meetingRecordingSummary:", meetingRecordingSummary)
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');

.recoder-container {
  background-color: #1c1c1c;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}

.recoder-icon {
  padding-top: 8%;
}

.recoder-button-container {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 20px;
}


/* recording button 관련*/
.recording-time {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  white-space: nowrap;
}

.recording-button {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: black;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s;
  user-select: none;
}

.recording-button:hover {
  opacity: 0.9;
}

.recording-button.red {
  background-color: #ff5252;
  color: white;
}


.recording-button-icon {
  width: 100%;
  height: 70%;
  background-color: #1c1c1c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recording-button-icon .v-icon {
  color: white !important;
}

.recording-button-text {
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  color: black;
  font-family: 'Noto Sans KR', sans-serif
}

/* download-button 관련 */
.download-button {
  width: 20%;
  height: 70%;
  background-color: #ffffff;
  color: black;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s;
  user-select: none;
}

.download-button-icon {
  width: 100%;
  height: 70%;
  background-color: #1c1c1c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.download-button-icon .v-icon {
  color: white !important;
}

.download-button-text {
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: bold;
  color: black;
  font-family: 'Noto Sans KR', sans-serif
}


/* analysis-button 관련 */
.analysis-button {
  width: 20%;
  height: 70%;
  background-color: #ffffff;
  color: black;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s;
  user-select: none;
}

.analysis-button-icon {
  width: 100%;
  height: 70%;
  background-color: #1c1c1c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.analysis-button-icon .v-icon {
  color: white !important;
}

.analysis-button-text {
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: bold;
  color: black;
  font-family: 'Noto Sans KR', sans-serif
}
</style>

