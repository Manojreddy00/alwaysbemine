import React, { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import Swal from "sweetalert2";

import MouseStealing from './MouseStealer.jsx';
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import Lovegif from "./assets/GifData/main_temp.gif";
import heartGif from "./assets/GifData/happy.gif";
import sadGif from "./assets/GifData/sad.gif";
import WordMareque from './MarqueeProposal.jsx';
import purposerose from './assets/GifData/RoseCute.gif';
import swalbg from './assets/Lovingbg2_main.jpg';
import loveu from './assets/GifData/cutieSwal4.gif';

// yes - Gifs Importing
import yesgif0 from "./assets/GifData/Yes/lovecutie0.gif";
import yesgif1 from "./assets/GifData/Yes/love2.gif";
import yesgif2 from "./assets/GifData/Yes/love3.gif";
import yesgif3 from "./assets/GifData/Yes/love1.gif";
import yesgif4 from "./assets/GifData/Yes/lovecutie1.gif";
import yesgif5 from "./assets/GifData/Yes/lovecutie5.gif";
import yesgif6 from "./assets/GifData/Yes/lovecutie7.gif";
import yesgif7 from "./assets/GifData/Yes/lovecutie8.gif";
import yesgif8 from "./assets/GifData/Yes/lovecutie3.gif";
import yesgif9 from "./assets/GifData/Yes/lovecutie9.gif";
import yesgif10 from "./assets/GifData/Yes/lovecutie6.gif";
import yesgif11 from "./assets/GifData/Yes/lovecutie4.gif";

// no - Gifs Importing
import nogif0 from "./assets/GifData/No/breakRej0.gif";
import nogif0_1 from "./assets/GifData/No/breakRej0_1.gif";
import nogif1 from "./assets/GifData/No/breakRej1.gif";
import nogif2 from "./assets/GifData/No/breakRej2.gif";
import nogif3 from "./assets/GifData/No/breakRej3.gif";
import nogif4 from "./assets/GifData/No/breakRej4.gif";
import nogif5 from "./assets/GifData/No/breakRej5.gif";
import nogif6 from "./assets/GifData/No/breakRej6.gif";
import nogif7 from "./assets/GifData/No/RejectNo.gif";
import nogif8 from "./assets/GifData/No/breakRej7.gif";

const YesGifs = [yesgif0, yesgif1, yesgif2, yesgif3, yesgif4, yesgif5, yesgif6, yesgif7, yesgif8, yesgif9, yesgif10, yesgif11];
const NoGifs  = [nogif0, nogif0_1, nogif1, nogif2, nogif3, nogif4, nogif5, nogif6, nogif7, nogif8];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [popupShown, setPopupShown] = useState(false);
  const [yespopupShown, setYesPopupShown] = useState(false);

  const gifRef = useRef(null);
  const yesButtonSize = noCount * 16 + 16;

  const [floatingGifs, setFloatingGifs] = useState([]);

  const generateRandomPositionWithSpacing = (existingPositions) => {
    let position;
    let tooClose;
    const minDistance = 15;

    do {
      position = {
        top: `${Math.random() * 90}vh`,
        left: `${Math.random() * 90}vw`,
      };

      tooClose = existingPositions.some((p) => {
        const dx = Math.abs(parseFloat(p.left) - parseFloat(position.left));
        const dy = Math.abs(parseFloat(p.top) - parseFloat(position.top));
        return Math.sqrt(dx * dx + dy * dy) < minDistance;
      });
    } while (tooClose);

    return position;
  };

  const handleMouseEnterYes = () => {
    const gifs = [];
    const positions = [];

    for (let i = 0; i < 10; i++) {
      const newPosition = generateRandomPositionWithSpacing(positions);
      positions.push(newPosition);

      gifs.push({
        id: `heart-${i}`,
        src: heartGif,
        style: {
          ...newPosition,
          animationDuration: `${Math.random() * 2 + 1}s`,
        },
      });
    }

    setFloatingGifs(gifs);
  };

  const handleMouseEnterNo = () => {
    const gifs = [];
    const positions = [];

    for (let i = 0; i < 10; i++) {
      const newPosition = generateRandomPositionWithSpacing(positions);
      positions.push(newPosition);

      gifs.push({
        id: `sad-${i}`,
        src: sadGif,
        style: {
          ...newPosition,
          animationDuration: `${Math.random() * 2 + 1}s`,
        },
      });
    }

    setFloatingGifs(gifs);
  };

  const handleMouseLeave = () => {
    setFloatingGifs([]);
  };

  // Keep Yes gif looping
  useEffect(() => {
    if (gifRef.current && yesPressed && noCount > 3) {
      gifRef.current.src = YesGifs[currentGifIndex];
    }
  }, [yesPressed, currentGifIndex]);

  // Change Yes gif every 5 seconds
  useEffect(() => {
    if (yesPressed && noCount > 3) {
      const intervalId = setInterval(() => {
        setCurrentGifIndex((prevIndex) => (prevIndex + 1) % YesGifs.length);
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [yesPressed, noCount]);

  useEffect(() => {
    if (gifRef.current) {
      gifRef.current.src = gifRef.current.src; // force reload to loop
    }
  }, [noCount]);

  const handleNoClick = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    if (nextCount >= 4) {
      const nextGifIndex = (nextCount - 4) % NoGifs.length;
      if (gifRef.current) {
        gifRef.current.src = NoGifs[nextGifIndex];
      }
    }
    // Audio logic was here — completely removed
  };

  const handleYesClick = () => {
    if (!popupShown) {
      setYesPressed(true);
    }
    if (noCount > 3) {
      setYesPressed(true);
      // Audio logic was here — completely removed
    }
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "U Have a heart!💕",
      "Don't be so cold!",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "But... why? 😢",
      "Please, pretty please? 💖",
      "I can't take this! 😫",
      "Are you sure you want to do this to me? 😢",
      "You're gonna hurt my feelings! 😥",
      "I need you to reconsider, like now! 😓",
      "I believe in you, don't disappoint me! 💔",
      "My heart says yes, what about yours? ❤️",
      "Don't leave me hanging! 😬",
      "Plsss? :( You're breaking my heart 💔",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  useEffect(() => {
    if (yesPressed && noCount < 4 && !popupShown) {
      Swal.fire({
        title: "❤️, I knew you would say yes before 3rd time Talking to you has given me a feeling I didn’t know I was missing. I know it’s early, but my feelings are real. No matter the destination, I want you to be my journey. Will you be my Valentine❤️ ?",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        width: 700,
        padding: "2em",
        color: "#716add",
        background: `#fff url(${swalbg})`,
        backdrop: `
          rgba(0,0,123,0.2)
          url(${loveu})
          right
          no-repeat
        `,
      });
      setPopupShown(true);
      setYesPressed(false);
    }
  }, [yesPressed, noCount, popupShown]);

  useEffect(() => {
    if (yesPressed && noCount > 3 && !yespopupShown) {
      Swal.fire({
        title: "Talking to you has given me a feeling I didn’t know I was missing. I know it’s early, but my feelings are real. No matter the destination, I want you to be my journey. Will you be my Valentine❤️ ? ",
        width: 800,
        padding: "2em",
        color: "#716add",
        background: `#fff url(${swalbg})`,
        backdrop: `
          rgba(0,0,123,0.7)
          url(${purposerose})
          right
          no-repeat
        `,
      });
      setYesPopupShown(true);
      setYesPressed(true);
    }
  }, [yesPressed, noCount, yespopupShown]);

  useEffect(() => {
    if (noCount == 25) {
      Swal.fire({
        title: "My love for you is endless, like the stars in the sky—shining for you every night, even if you don’t always notice. 🌟 I’ll wait patiently, proving every day that you’re my everything. ❤️ Please press ‘Yes’ and let’s make this a forever story. 🥰✨<br/>'True love never gives up; it grows stronger with time.'",
        width: 850,
        padding: "2em",
        color: "#716add",
        background: `#fff url(${swalbg})`,
        backdrop: `
          rgba(0, 104, 123, 0.7)
          url(${nogif1})
          right
          no-repeat
        `,
      });
    }
  }, [noCount]);

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen -z-10">
        <Spline scene="https://prod.spline.design/oSxVDduGPlsuUIvT/scene.splinecode" />
        {/* <Spline scene="https://prod.spline.design/ZU2qkrU9Eyt1PHBx/scene.splinecode" /> */}
      </div>

      {noCount > 16 && noCount < 25 && yesPressed == false && <MouseStealing />}

      <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-16 selection:bg-rose-600 selection:text-white text-zinc-900">
        {yesPressed && noCount > 3 ? (
          <>
            <img
              ref={gifRef}
              className="h-[230px] rounded-lg"
              src={YesGifs[currentGifIndex]}
              alt="Yes Response"
            />
            <div className="text-4xl md:text-6xl font-bold my-2" style={{ fontFamily: "Charm, serif", fontWeight: "700", fontStyle: "normal" }}>
              ❤️❤️❤️❤️❤️
            </div>
            <div className="text-4xl md:text-4xl font-bold my-1" style={{ fontFamily: "Beau Rivage, serif", fontWeight: "500", fontStyle: "normal" }}>
              Pavithra.
            </div>
            <WordMareque />
          </>
        ) : (
          <>
            <img
              src={lovesvg}
              className="fixed animate-pulse top-10 md:left-15 left-6 md:w-40 w-28"
              alt="Love SVG"
            />
            <img
              ref={gifRef}
              className="h-[230px] rounded-lg"
              src={Lovegif}
              alt="Love Animation"
            />
            <h1 className="text-4xl md:text-6xl my-4 text-center">
              Will you be my Valentine?
            </h1>
            <div className="flex flex-wrap justify-center gap-2 items-center">
              <button
                onMouseEnter={handleMouseEnterYes}
                onMouseLeave={handleMouseLeave}
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4`}
                style={{ fontSize: yesButtonSize }}
                onClick={handleYesClick}
              >
                Yes
              </button>
              <button
                onMouseEnter={handleMouseEnterNo}
                onMouseLeave={handleMouseLeave}
                onClick={handleNoClick}
                className="bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-bold py-2 px-4"
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>
            {floatingGifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.src}
                alt="Floating Animation"
                className="absolute w-12 h-12 animate-bounce"
                style={gif.style}
              />
            ))}
          </>
        )}
        {/* Mute button removed */}

        <Footer />
      </div>
    </>
  );
}

const Footer = () => {
  return (
    <a
      className="fixed bottom-2 right-2 backdrop-blur-md opacity-80 hover:opacity-95 border p-1 rounded border-rose-300"
      href="https://github.com/Manojreddy00"
      target="_blank"
      rel="noopener noreferrer"
    >
      Made with{" "}
      <span role="img" aria-label="heart">
        ❤️
      </span>
      {" "}by Your Manoj
    </a>
  );
};