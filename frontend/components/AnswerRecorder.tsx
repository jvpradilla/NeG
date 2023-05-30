import Webcam from "react-webcam";
import React, { useCallback, useRef, useState } from "react";



export default function RecordVideo() {

  const webCamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder>();
  const [url, setUrl] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  //video/webm;codecs=vp9,opus
  //video/x-matroska;codecs=avc1,opus

  const constraints = {
    //width:  { min: 640, ideal: 1920, max: 1920 },
   // height: { min: 400, ideal: 1080 },
    //aspectRatio: 1.777777778,
    frameRate: { max: 30 },
    facingMode:  "user"
  };

  const uploadAnswer = async (pBlob: Blob) => {
    const response = await fetch("http://localhost:5000/seed", {
      method: "POST",
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: pBlob
    });
    if( response.status !== 200 ) {
      console.log(await response.json());
    } else {
      return (await response.json()).url as string;    
    }
  };

  const handleDataAvailable = useCallback(({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
  }, [setRecordedChunks]);


  const handleStartCaptureClick = useCallback(() => {
    const video = webCamRef.current as Webcam;
    const stream = video.stream as MediaStream;
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9,opus"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    console.log("grabando");
  }, [webCamRef, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      console.log("parando");
    }
  }, [mediaRecorderRef]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm;codecs=vp9,opus",
      });

      console.log(blob);

      uploadAnswer(blob);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);


  return (
    <div>
      <Webcam ref={webCamRef} screenshotFormat="image/jpeg" audio={true} muted={true} mirrored={true} videoConstraints={constraints}/>
      <button onClick={handleStartCaptureClick}>Start Capture</button>
      <button onClick={handleStopCaptureClick}>Stop Capture</button>
      <button onClick={handleDownload}>Download</button>
      <button>Upload</button>
    </div>
  );
}