"use client";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function VoiceInput() {
  const { transcript } = useSpeechRecognition();

  return (
    <div>
      <button
        onClick={() =>
          SpeechRecognition.startListening({
            continuous: true,
          })
        }
      >
        🎤
      </button>

      <p>{transcript}</p>
    </div>
  );
}