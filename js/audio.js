// Web Speech API Integration
// Handles Text-To-Speech (zh-CN) & SpeechRecognition (zh-CN)

const AudioService = {
  synth: window.speechSynthesis,
  recognition: null,
  isRecording: false,

  // Text To Speech
  speak(text, onEndCallback = null) {
    if (!this.synth) {
      console.warn("SpeechSynthesis not supported on this browser.");
      if (onEndCallback) onEndCallback();
      return;
    }

    // Cancel ongoing speech
    this.synth.cancel();

    if (!text || text.trim() === "") return;

    const utterance = new SpeechSynthesisUtterance(text);
    const settings = window.StorageService ? window.StorageService.getSettings() : { speechRate: 0.9 };
    utterance.rate = settings.speechRate || 0.9;
    utterance.pitch = 1.0;
    utterance.lang = "zh-CN";

    // Try finding a native zh-CN or Chinese voice
    const voices = this.synth.getVoices();
    const zhVoice = voices.find(
      (v) => v.lang === "zh-CN" || v.lang === "zh-TW" || v.lang.startsWith("zh") || v.name.includes("Chinese")
    );
    if (zhVoice) {
      utterance.voice = zhVoice;
    }

    if (onEndCallback) {
      utterance.onend = () => onEndCallback();
      utterance.onerror = () => onEndCallback();
    }

    this.synth.speak(utterance);
  },

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  },

  // Speech Recognition (Microphone to Text in Chinese)
  initRecognition(callbacks = {}) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported in this browser.");
      return null;
    }

    const reco = new SpeechRecognition();
    reco.lang = "zh-CN";
    reco.continuous = false;
    reco.interimResults = true;
    reco.maxAlternatives = 1;

    reco.onstart = () => {
      this.isRecording = true;
      if (callbacks.onStart) callbacks.onStart();
    };

    reco.onresult = (event) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (callbacks.onResult) {
        callbacks.onResult({ final, interim });
      }
    };

    reco.onerror = (event) => {
      this.isRecording = false;
      console.error("Speech recognition error:", event.error);
      if (callbacks.onError) callbacks.onError(event.error);
    };

    reco.onend = () => {
      this.isRecording = false;
      if (callbacks.onEnd) callbacks.onEnd();
    };

    this.recognition = reco;
    return reco;
  },

  startListening(callbacks) {
    if (!this.recognition) {
      this.initRecognition(callbacks);
    } else {
      // update callbacks
      if (callbacks.onStart) this.recognition.onstart = () => { this.isRecording = true; callbacks.onStart(); };
      if (callbacks.onResult) {
        this.recognition.onresult = (event) => {
          let interim = "";
          let final = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) final += event.results[i][0].transcript;
            else interim += event.results[i][0].transcript;
          }
          callbacks.onResult({ final, interim });
        };
      }
      if (callbacks.onError) this.recognition.onerror = (e) => { this.isRecording = false; callbacks.onError(e.error); };
      if (callbacks.onEnd) this.recognition.onend = () => { this.isRecording = false; callbacks.onEnd(); };
    }

    if (!this.recognition) {
      if (callbacks.onError) {
        callbacks.onError("Trình duyệt không hỗ trợ Web Speech API. Bạn có thể gõ văn bản trực tiếp.");
      }
      return false;
    }

    try {
      this.recognition.start();
      return true;
    } catch (e) {
      console.error("Failed to start speech recognition:", e);
      return false;
    }
  },

  stopListening() {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
    }
  }
};

// Pre-load voices
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    // voices ready
  };
}

window.AudioService = AudioService;
