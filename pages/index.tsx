import { useState, useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import localFont from "@next/font/local";
import { css } from "glamor";

const poppins = localFont({
  src: [
    {
      path: "../public/Geometria.ttf",
      weight: "400",
    },
  ],
  variable: "--font-poppins",
});
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const videoRef = useRef(null);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const { select, wallets, publicKey, disconnect } = useWallet();
  const [xsHidden, setXsHidden] = useState<string>("hidden");
  const [connectStatus, setConnectStatus] = useState("Connect wallet");
  const [videoHidden, setVideoHidden] = useState<string>("hidden");
  const [spinHidden, setSpinHidden] = useState<string>("show");
  const [winStatus, setWinStatus] = useState<string>("");
  const [playStatus, setPlayStatus] = useState<boolean>(false);
  const [firstModal, setFirstModal] = useState<string>("");
  const [tabsShow, setTabsShow] = useState<string>("hidden");
  const [walletColor, setWalletColor] = useState<string>(
    "text-white bg-black/50 backdrop-blur-[4px] border-[#D679BC] border-solid border-2"
  );
  const [WalletPhantomButtonContext, setWalletPhantomButtonContext] =
    useState<string>("text-white");
  const [walletPhantomButtonBackground, setWalletPhantomButtonBackground] =
    useState<string>("");
  const [walletBackpackButtonContext, setWalletBackpackButtonContext] =
    useState<string>("text-white");
  const [walletBackpackButtonBackground, setWalletBackpackButtonBackground] =
    useState<string>("");
  const [backpackIcon, setBackpackIcon] = useState<string>("/Backpack.svg");
  const [walletName, setWalletName] = useState<string>("");
  const [connectButtonIcon, setConnectButtonIcon] =
    useState<string>("w-[25px]");
  const [connectWalletIcon, setConnectWalletIcon] =
    useState<string>("/PhantomIcon.svg");
  const [connectWalletName, setConnectWalletName] = useState<string>("");
  const [dropIcon, setDropIcon] = useState<string>("hidden");
  const [navBarIconShow, setNavBarIconShow] = useState<string>("");
  const [navWalletIcon, setNavWalletIcon] = useState<string>("");
  const [remainTimes, setRemainTimes] = useState<number>(0);
  const [showCongratulationModal, setShowCongratulationModal] =
    useState<boolean>(false);
  const [winValue, setWinValue] = useState<number>(1);
  const [winPossible, setWinPossible] = useState<string>("possible");
  const [gray1, setGray1] = useState<string>("text-white");
  const [gray2, setGray2] = useState<string>("text-white");
  const [gray3, setGray3] = useState<string>("text-white");
  const [connectStatusText, setConnectStatusText] = useState<string>("");
  const [playAvail, setPlayAvail] = useState<string>("");
  const [desktopConnectButtonIcon, setDesktopConnectButtonIcon] =
    useState<string>("");
  const [showAddWallet, setShowAddWallet] = useState<boolean>(false);
  const [nickName, setNickName] = useState<string>("");

  function getRandom() {
    var num = Math.random();
    if (num < 0.1) return 1; //probability 0.1
    else if (num < 0.4) return 2; // probability 0.3
    else return 3; //probability 0.6
  }
  function handleChangeNickName(event) {
    setNickName(event.target.value);
  }
  function getRandom1() {
    var num = Math.random();
    if (num < 0.4) return 2; // probability 0.3
    else return 3; //probability 0.6
  }
  const remainTime = () => {
    const now = new Date();
    const nowHours = now.getUTCHours();
    const nowMinutes = now.getUTCMinutes();
    const nowSeconds = now.getUTCSeconds();
    const difSeconds =
      24 * 3600 - nowHours * 3600 - nowMinutes * 60 - nowSeconds;
    const remainTime = Math.floor(difSeconds / 3600);
    const remainMinutes = Math.floor((difSeconds - remainTime * 3600) / 60);
    const string =
      "0 🎟️ come back in " +
      remainTime +
      " hours " +
      remainMinutes +
      " minutes";
    return string;
  };
  // const fetchData = async () => {

  //   try {
  //     const response = await axios.post('https://climb-server.onrender.com/api/spots/remainTimes', {
  //       data: {
  //         walletAddress: publicKey.toBase58()
  //       },
  //     })
  //     setRemainTimes(4-response.data.remainTimes)
  //     setWinPossible(response.data.winPossible)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://climb-server.onrender.com/api/spots/remainTimes",
        {
          data: {
            walletAddress: publicKey.toBase58(),
          },
        }
      );
      setRemainTimes(4 - response.data.remainTimes);
      setWinPossible(response.data.winPossible);
    } catch (error) {
      console.error(error);
    }
  };
  const playAvailable = async () => {
    try {
      const response = await axios.post(
        "https://climb-server.onrender.com/api/wallet/getAvailable",
        {
          data: {
            walletAddress: publicKey.toBase58(),
          },
        }
      );
      setPlayAvail(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchData1 = async () => {
  //   try {
  //     const response = await axios.post('https://climb-server.onrender.com/api/spots/remainTimes', {
  //       data: {
  //         walletAddress: publicKey.toBase58()
  //       },
  //     })
  //     setWinPossible(response.data.winPossible)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const fetchData1 = async () => {
    try {
      const response = await axios.post(
        "https://climb-server.onrender.com/api/spots/remainTimes",
        {
          data: {
            walletAddress: publicKey.toBase58(),
          },
        }
      );
      setWinPossible(response.data.winPossible);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConnectWallet = (name) => {
    if (name === "Phantom") {
      setWalletPhantomButtonBackground("bg-white");
      setWalletPhantomButtonContext("text-[#D679BC]");
      setWalletBackpackButtonBackground("");
      setWalletBackpackButtonContext("text-white");
      setBackpackIcon("/Backpack.svg");
      setWalletName("Phantom");
    } else if (name === "Backpack") {
      setWalletBackpackButtonBackground("bg-white");
      setWalletBackpackButtonContext("text-[#D679BC]");
      setWalletPhantomButtonBackground("");
      setWalletPhantomButtonContext("text-white");
      setBackpackIcon("/backpackchange.svg");
      setWalletName("Backpack");
    }
    const wallet = wallets.filter((item) => item.adapter.name === name);
    if (
      wallet[0].readyState === "NotDetected" &&
      wallet[0].adapter.name === "Backpack"
    )
      location.href =
        "https://chrome.google.com/webstore/detail/backpack/aflkmfhebedbjioipglgcbcmnbpgliof";
    else if (
      wallet[0].readyState === "NotDetected" &&
      wallet[0].adapter.name === "Phantom"
    )
      location.href =
        "https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa";
    else
      select(wallet[0].adapter.name),
        setConnectWalletName(wallet[0].adapter.name),
        setShowModal1(false),
        localStorage.setItem("walletName", wallet[0].adapter.name);
  };
  const handleOpenChallenge = async () => {
    if (!publicKey) {
      toast("Please connect wallet", {
        hideProgressBar: false,
        autoClose: 2000,
        type: "error",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (publicKey) {
      if (playAvail === "Your wallet does not exist in white list") {
        setShowAddWallet(true);
      }

      // const response = await axios.post('https://climb-server.onrender.com/api/spots/remainTimes', {
      //   data: {
      //     walletAddress: publicKey.toBase58()
      //   },
      // })
      else {
        setShowModal(true);
        setXsHidden("hidden");
        setShowChallengeModal(true);
        setNavBarIconShow("");
        setWinStatus("");
        setGray1("text-gray-100 bg-[#929292]/40");
        setGray2("text-white");
        setGray3("text-white");
      }
    }
  };
  // const endSpotRotate = async() => {
  //   setPlayStatus(false)
  //   setVideoHidden("hidden")
  //   setSpinHidden("")
  //   if (winValue === 1){
  //     setShowCongratulationModal(true)
  //     setShowChallengeModal(false)
  //   }
  //   else if (winValue === 3){
  //     setShowLooseModal(true)
  //     setShowChallengeModal(false)
  //   }
  //   const response = await axios.post('https://climb-server.onrender.com/api/spots', {
  //     data: {
  //       walletAddress: publicKey.toBase58(),
  //       winStatus: winValue
  //     },
  //   })
  const endSpotRotate = async () => {
    setPlayStatus(false);
    setVideoHidden("hidden");
    setSpinHidden("");
    if (winValue === 1) {
      setShowCongratulationModal(true);
      setShowChallengeModal(false);
    } else {
      const response = await axios.post(
        "https://climb-server.onrender.com/api/spots",
        {
          data: {
            walletAddress: publicKey.toBase58(),
            winStatus: winValue,

          },
        }
      );
    }
  };

  const sendWin = async () => {
    if(nickName === ""){
      toast("Please input nickname", {
        hideProgressBar: false,
        autoClose: 2000,
        type: "error",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    else{
      setShowCongratulationModal(false); 
      const response = await axios.post(
        "https://climb-server.onrender.com/api/spots",
        {
          data: {
            walletAddress: publicKey.toBase58(),
            winStatus: 1,
            nickName: nickName
          },
        }
      );
    }
      
  };

  const videoHandler = async () => {
    if (playStatus === false) {
      if (!publicKey) {
        toast("Please connect wallet", {
          hideProgressBar: false,
          autoClose: 2000,
          type: "error",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else if (publicKey) {
        if (remainTimes === 0) {
          setVideoHidden("hidden");
          setSpinHidden("");
          setRemainTimes(0);
          toast(remainTime(), {
            hideProgressBar: false,
            autoClose: 2000,
            type: "error",
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          if (winPossible === "possible") {
            setRemainTimes(remainTimes - 1);
            setVideoHidden("");
            setSpinHidden("hidden");
            const videoNum = getRandom();
            setWinValue(videoNum);
            setWinStatus("/spot/" + videoNum + ".webm");
            await videoRef.current.play();
          }
          if (winPossible === "impossible") {
            setRemainTimes(remainTimes - 1);
            setVideoHidden("");
            setSpinHidden("hidden");
            const videoNum = getRandom1();
            setWinValue(videoNum);
            setWinStatus("/spot/" + videoNum + ".webm");
            await videoRef.current.play();
          }
        }
      }
    }
  };

  useEffect(() => {
    setConnectWalletName(localStorage.getItem("walletName"));
    if (!publicKey) {
      setConnectStatus("Connect wallet");
      setConnectButtonIcon("w-[30px]");
      setDesktopConnectButtonIcon("hidden");
      setDropIcon("hidden");
      setWalletColor(
        "text-white bg-black/50 backdrop-blur-[4px] border-[#D679BC] border-solid border-2"
      );
      setConnectStatusText("text-[#D679BC]");
      setNavWalletIcon("/drop.svg");
    } else if (publicKey) {
      const connectPublic =
        publicKey.toBase58().substring(0, 4) +
        ".." +
        publicKey.toBase58().substring(39, 43);
      setConnectStatus(connectPublic);
      // handleConnectWallet()
      setWalletColor("bg-white text-black");
      setConnectStatusText("text-white");
      if (
        connectWalletName === "Phantom" ||
        connectWalletName === '"Phantom"'
      ) {
        setConnectButtonIcon("w-[25px]");
        setDesktopConnectButtonIcon("w-[25px]");
        setDropIcon("");
        setConnectWalletIcon("/PhantomIcon.svg");
        setNavWalletIcon("/phantomNav.svg");
      } else if (
        connectWalletName === "Backpack" ||
        connectWalletName === '"Backpack"'
      ) {
        setConnectButtonIcon("w-[17px]");
        setDesktopConnectButtonIcon("w-[17px]");
        setConnectWalletIcon("/backpackchange.svg");
        setNavWalletIcon("/Backpack.svg");
        setDropIcon("");
      }

      fetchData();
      playAvailable();
    }
  }, [publicKey]);

  return (
    <div className={`absolute h-screen w-screen ${poppins.variable} font-sans`}>
      <iframe className="z-0 h-screen w-screen absolute" src="1.html"></iframe>
      <div
        className={`flex fixed items-center justify-center w-screen h-screen bg-black/50 backdrop-blur-[4px] ${firstModal} z-10 `}
      >
        <div className="absolute md:w-[600px] md:h-[350px] w-full h-full  md:rounded-tr-[25px] md:rounded-bl-[25px] bg-black/50 backdrop-blur-[4px] z-1">
          <button
            className="absolute top-[40px] right-[40px] z-50"
            onClick={() => {
              setFirstModal("hidden"), setTabsShow("flex");
            }}
          >
            <img src="/close.svg"></img>
          </button>
          <div className="flex fixed px-10 md:top-0 top-[150px] md:w-[600px] md:h-[350px] md:items-center md:justify-center">
            <div className="flow-root">
              <div className="flex md:justify-center md:items-center">
                <img
                  className="md:w-[140px] w-[160px] md:h-[60px] h-[80px] md:mb-[22px] mb-[40px]"
                  src="/mLogo.svg"
                ></img>
              </div>
              <div
                className={`md:text-center mb-[26px] text-white ${poppins.variable} font-sans font-semibold md:text-[16px] text-[25px]`}
              >
                Experience an exciting journey by immersing yourself <br /> in a
                unique interactive adventure within the city of Marius.
              </div>
              <div
                className={`md:text-center md:mb-[26px] mb-[80px] text-white ${poppins.variable} font-sans font-semibold md:text-[16px] text-[25px]`}
              >
                You can count on Marius to take good care of you and create{" "}
                <br /> a truly enjoyable adventure.
              </div>
              <div className="flex justify-center items-center">
                <button
                  className={` border border-[#D679BC] md:w-[250.68px] md:h-[45.04px] w-[400px] h-[60px] rounded-[7px] ${poppins.variable} md:text-[24px] text-[35px] font-sans font-semibold text-white`}
                  onClick={() => {
                    setFirstModal("hidden"), setTabsShow("flex");
                  }}
                >
                  Marius City
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute hidden md:${tabsShow} w-[700px] h-[50px] z-1 top-[68px] right-16`}
      >
        <div className="grid grid-cols-3 items-center justify-center h-50 z-1 w-[350px] h-[50px] bg-black/50 rounded-[12px]  backdrop-blur-[4px] ">
          <div
            className={`flex w-full h-full rounded-l-[12px] ${gray1} text-[16px] ${poppins.variable} font-sans`}
          >
            <button className="m-auto" onClick={() => handleOpenChallenge()}>
              Challenges
            </button>
          </div>
          <div className={`flex w-full h-full items-center ${gray2}`}>
            <div className="m-auto">
              <div className="inline-flex mt-[2px]  left-0">
                <img className="w-[11px] h-[14.3px]" src="/key.svg" />
              </div>
              <button
                onClick={() => {
                  setGray2("text-gray-100 bg-[#929292]/40"),
                    setGray1("text-white"),
                    setGray3("text-white");
                }}
                className={`text-[16px] ml-[5px] ${poppins.variable} font-sans`}
              >
                Studio
              </button>
            </div>
          </div>
          <div
            className={`flex w-full h-full items-center rounded rounded-r-[12px] ${gray3}`}
          >
            <div className="m-auto">
              <div className=" inline-flex mt-[2px] left-0">
                <img className="w-[11px] h-[14.3px]" src="/key.svg" />
              </div>
              <button
                onClick={() => {
                  setGray3("text-gray-100 bg-[#929292]/40"),
                    setGray2("text-white"),
                    setGray1("text-white");
                }}
                className={`text-[16px] ml-[5px] ${poppins.variable} font-sans`}
              >
                Cinema
              </button>
            </div>
          </div>
        </div>
        <div className="h-25 z-1 bg-black/50 rounded-[12px] p-2 px-3 backdrop-blur-[4px] inline-flex ml-5">
          <img src="/twitter.svg" className="h-6 w-6 m-auto" />
        </div>
        <div className="h-25 z-1 bg-black/50 rounded-[12px]  backdrop-blur-[4px] inline-flex ml-5">
          <img src="/discord.svg" className="h-12 w-12" />
        </div>
        <button
          className={`inline-flex w-[190px] justify-center hover:bg-[#D679BC] items-center rounded-[12px] font-bold py-3 ${walletColor} ml-[25px]`}
          type="button"
          onClick={() => {
            if (connectStatus === "Connect wallet") setShowModal1(true);
            else if (connectStatus !== "Connect wallet") disconnect();
          }}
        >
          <img
            className={`ml-4 mr-[3px] ${desktopConnectButtonIcon}`}
            src={connectWalletIcon}
          ></img>
          <div
            className={`w-[200px] whitespace-nowrap ${poppins.variable} font-sans`}
          >
            {connectStatus}
          </div>
          <img
            className={`my-auto w-[30px] mr-[10px] ${dropIcon}`}
            src="/drop.svg"
          ></img>
        </button>
      </div>
      {/* response */}
      <button
        data-collapse-toggle="navbar-sticky"
        type="button"
        className={`absolute top-12 ${navBarIconShow} right-8 inline-flex items-center p-2 z-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
        aria-controls="navbar-sticky"
        aria-expanded="false"
        onClick={() => {
          if (xsHidden === "hidden") {
            setXsHidden(""), setNavBarIconShow("hidden");
          } else {
            setXsHidden("hidden"), setNavBarIconShow("");
          }
        }}
      >
        <span className="sr-only">Open main menu</span>
        <img className="w-[23px]" src="/navBarIcon.svg"></img>
      </button>
      <div
        className={`w-screen h-screen z-1 md:flex md:w-screen  ${xsHidden}`}
        id="navbar-sticky"
      >
        <ul className="flex flex-col p-4 md:p-0 font-semibold md:flex-row md:hidden md:space-x-14 h-screen border-black rounded-lg w-full m-auto bg-black/80 backdrop-blur-[2px] md:mt-0">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="absolute top-12 right-8 inline-flex items-center p-2 z-2 text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => {
              {
                setXsHidden("hidden"), setNavBarIconShow("");
              }
            }}
          >
            <span className="sr-only">Open main menu</span>
            <img className="w-[23px]" src="/navBarClose.svg"></img>
          </button>
          <li className="md:hidden mt-[147px] mx-[15px]">
            <div
              className={`inline-flex ${connectStatusText} relative items-center  w-full font-sans font-bold text-[28px] border-b border-spacing-3  py-4  border-solid border-gray-500`}
            >
              <button
                onClick={() => {
                  if (connectStatus === "Connect wallet") setShowModal1(true);
                  else if (connectStatus !== "Connect wallet") {
                    disconnect();
                  }
                }}
              >
                {connectStatus}
              </button>
              <img
                className={`absolute right-0 mt-4 ${connectButtonIcon}`}
                src={navWalletIcon}
              ></img>
            </div>
          </li>
          <li className="md:hidden mx-[15px]">
            <div className="inline-flex relative items-center w-full text-white font-sans font-bold text-[28px] border-b border-spacing-3  py-4  border-solid border-gray-500">
              <button
                onClick={() => {
                  handleOpenChallenge();
                }}
              >
                Challenges
              </button>
            </div>
          </li>
          <li className="md:hidden mx-[15px]">
            <div className="inline-flex relative items-center w-full text-white font-sans font-bold text-[28px] border-b border-spacing-3  py-4  border-solid border-gray-500">
              <button
                onClick={() => {
                  setShowModal(true),
                    setXsHidden("hidden"),
                    setNavBarIconShow("");
                }}
              >
                Studio
              </button>
              <img className={`absolute right-0 w-4`} src="/key.svg"></img>
            </div>
          </li>
          <li className="md:hidden mx-[15px]">
            <div className="inline-flex relative items-center w-full text-white font-sans font-bold text-[28px] border-b border-spacing-3  py-4  border-solid border-gray-500">
              <button
                onClick={() => {
                  setShowModal(true),
                    setXsHidden("hidden"),
                    setNavBarIconShow("");
                }}
              >
                Cinema
              </button>
              <img className={`absolute right-0 w-4`} src="/key.svg"></img>
            </div>
          </li>
          <li className="md:hidden mx-[15px]">
            <div className="inline-flex relative items-center w-full text-white font-sans font-bold text-[28px] border-b border-spacing-3  py-4  border-solid border-gray-500">
              <button
                onClick={() => {
                  setShowModal(true),
                    setXsHidden("hidden"),
                    setNavBarIconShow("");
                }}
              >
                Discord
              </button>
              <img
                className={`absolute right-0 w-6 ml-2`}
                src="/navDiscord.svg"
              ></img>
              {/* <img src ='/Discord.png' className=' absolute object-scale-down px-3  right-4'/> */}
            </div>
          </li>
          <li className="md:hidden mx-[15px]">
            <div className="inline-flex relative items-center w-full text-white font-sans font-bold text-[28px] border-b border-spacing-3  py-4  border-solid border-gray-500">
              <button
                onClick={() => {
                  setShowModal(true),
                    setXsHidden("hidden"),
                    setNavBarIconShow("");
                }}
              >
                Twitter
              </button>
              <img
                className={`absolute right-0 w-6 ml-2`}
                src="/navTwitter.svg"
              ></img>
            </div>
          </li>
        </ul>
      </div>
      <ToastContainer
        toastStyle={{ backgroundColor: "#dc5148", color: "white" }}
      />
      {/* challenge */}
      {showChallengeModal ? (
        <>
          <div>
            <div className="md:w-screen md:h-screen w-screen h-full md:top-0 top-[150px] bg-black/80 backdrop-blur-[9px] border border-gray md:border-none md:rounded-none rounded-[30px] fixed inset-0 z-3 outline-none focus:outline-none pb-20">
              <div className="text-white md:hidden mt-[20px] text-center font-sans font-bold text-[30px] mb-[40px]">
                {remainTimes} 🎟️
              </div>
              <button
                className="md:mt-[63px] md:ml-[198px] md:top-0 top-[-100px] bg-black/80 backdrop-blur-[4px] border border-[#D679BC] left-4 absolute  h-12 rounded-[12px]"
                onClick={() => {
                  setShowChallengeModal(false),
                    setXsHidden("hidden"),
                    setNavBarIconShow("");
                }}
              >
                <div className="m-auto px-10 inline-flex text-white">
                  <div className="my-auto h-1/2 inline-flex mr-2">
                    <img src="/line.svg" />
                  </div>
                  Back
                </div>
              </button>
              <div className="w-screen h-screen  flex justify-center m-auto">
                <div className="inline-flex my-auto  h-full">
                  <div
                    className={`md:m-auto mt-4 md:w-[600px] w-[400px] ${spinHidden}`}
                  >
                    <img src="/2.png" />
                  </div>
                  <div
                    className={`md:w-[590px] md:m-auto mt-4 w-[390px] ${videoHidden}`}
                  >
                    <video
                      ref={videoRef}
                      autoPlay
                      src={winStatus}
                      onPlay={() => setPlayStatus(true)}
                      onEnded={() => endSpotRotate()}
                    ></video>
                  </div>
                  <div className="md:flex flex-col items-center hidden justify-center w-[330px] h-[350px] my-auto rounded-[20px] bg-black/10 backdrop-blur-[5px]">
                    <div className="inline-flex items-center text-white text-center font-sans font-bold text-[30px] mb-[40px]">
                      {remainTimes}
                      <div className="text-[30px] ml-4">🎟️</div>
                    </div>
                    <button
                      className="flex items-center justify-center bg-white h-[50px] w-[200px] rounded-[6px] mb-[12px] font-bold font-sans text-[25px]"
                      onClick={() => {
                        videoHandler();
                      }}
                    >
                      Spin
                    </button>
                    <button className="flex items-center border-solid w-[200px] mb-[20px] h-12 bg-[#929292]/40 backdrop-blur-[4px] rounded-full text-[#BABABA] text-xl">
                      <img src="/lockModal.svg" className="ml-[12px]"></img>
                      <img src="/film.svg" className="ml-[20px] mt-[3px]"></img>
                      <div className="text-[25px] font-bold ml-[3px]">Dice</div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:hidden items-center justify-center mt-[-500px] w-full">
                <button
                  className="flex md:hidden items-center justify-center bg-white h-[50px] w-[200px] rounded-[6px] font-bold font-sans mb-6 text-[25px]"
                  onClick={() => {
                    videoHandler();
                  }}
                >
                  Spin
                </button>
                <button className="flex items-center border-solid w-[200px] mb-[20px] h-12 bg-[#929292]/40 backdrop-blur-[4px] rounded-full text-[#BABABA] text-xl">
                  <img src="/lockModal.svg" className="ml-[12px]"></img>
                  <img src="/film.svg" className="ml-[20px] mt-[3px]"></img>
                  <div className="text-[25px] font-bold ml-[3px]">Dice</div>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showModal1 ? (
        <>
          <div className="absolute flex justify-center items-center z-3 w-screen h-screen inset-0 bg-black/50 rounded-[12px]  backdrop-blur-[4px]">
            <div className="flex justify-center items-center w-[400px] h-[300px] md:w-[480px] md:h-[340px] bg-black/30 rounded-[12px]  backdrop-blur-[4px]">
              <button
                className="absolute top-[40px] right-[35px] w-[15px] z-[2]"
                onClick={() => setShowModal1(false)}
              >
                <img src="/close1.svg"></img>
              </button>
              <div className="flow-root">
                <div className="text-[26px] text-center font-bold text-white mb-14">
                  Select your wallet
                </div>
                <button
                  className={`flex items-center border-2 w-[300px] ${walletPhantomButtonBackground} h-[60px] rounded-[12px] mb-4`}
                  onClick={() => handleConnectWallet("Phantom")}
                >
                  <img className="w-[36px] ml-8" src="/PhantomIcon.svg"></img>
                  <div
                    className={`ml-4 ${WalletPhantomButtonContext} font-bold text-[22px]`}
                  >
                    Phantom
                  </div>
                </button>
                <button
                  className={`flex items-center ${walletBackpackButtonBackground} border-2 w-[300px] h-[60px] rounded-[12px] mb-6`}
                  onClick={() => handleConnectWallet("Backpack")}
                >
                  <img
                    className={`w-[24px] ml-[38px]`}
                    src={backpackIcon}
                  ></img>
                  <div
                    className={`ml-[23px] font-bold text-[22px] ${walletBackpackButtonContext}`}
                  >
                    Backpack
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showCongratulationModal ? (
        <>
          <div className="absolute flex justify-center items-center z-3 w-screen h-screen inset-0 bg-black/50   backdrop-blur-[4px]">
            <div className="flex justify-center items-center w-full h-full md:w-[580px] md:h-[415px] bg-black/30 rounded-[20px]  backdrop-blur-[30px]">
              <button
                className="absolute top-[40px] right-[35px] w-[15px] z-[2]"
                onClick={() => {
                  setShowCongratulationModal(false), handleOpenChallenge();
                }}
              >
                <img src="/close1.svg"></img>
              </button>
              <div className="flow-root items-center">
                <div className="text-[35px] text-center font-bold text-[#FF9E2C] mb-[2px]">
                  Congratulations!
                </div>
                <div className="text-[25px] text-center text-white mb-[20px]">
                  you are now part of the <br /> advanture
                </div>
                <div className="flex justify-center items-center w-[580px] mb-[20px]">
                  <div className="w-[450px] border-b-2"></div>
                </div>
                <div className="flex justify-center items-center w-[580px]">
                  <div className="w-[250px] border inline-flex items-center border-white/25 rounded-lg">
                    <img
                      src="/navDiscord1.svg"
                      className="w-[25px] my-4 ml-4"
                    ></img>
                    <input
                      placeholder="Your discord nickname"
                      onChange={handleChangeNickName}
                      className=" bg-white/0 ml-4 border-white/5 outline-none text-[15px] h-full text-white"
                    ></input>
                  </div>
                </div>
                <div className="flex justify-center items-center w-[580px] mt-[20px]">
                  <button className="w-[250px] bg-[#D679BC] text-[20px] font-bold text-white py-3 rounded-lg" onClick={sendWin}>
                    Enter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showAddWallet ? (
        <>
          <div className="absolute flex justify-center items-center z-3 w-screen h-screen inset-0 bg-black/50   backdrop-blur-[4px]">
            <div className="flex justify-center items-center w-[450px] h-[380px] md:w-[550px] md:h-[380px] bg-black/30 rounded-[20px]  backdrop-blur-[30px]">
              <button
                className="absolute top-[40px] right-[35px] w-[15px] z-[2]"
                onClick={() => {
                  setShowAddWallet(false);
                }}
              >
                <img src="/close1.svg"></img>
              </button>
              <div className="flow-root items-center">
                <div className="md:text-[30px] text-[26px] text-center font-bold text-white mb-[14px]">
                  Your wallet <br /> is not part of the adventure
                </div>
                <div className="flex items-center justify-center w-full mb-4">
                  <button className="inline-flex items-center w-[300px] rounded-[8px] bg-white py-[8px] ">
                    <div className="bg-[#5662F6] rounded-[8px] px-[10px] py-[12px] ml-[10px]">
                      <img src="/navDiscord.svg" className="w-[30px]"></img>
                    </div>
                    <div className="text-[23px] ml-4 font-bold text-[#D679BC]">
                      Daily quests
                    </div>
                  </button>
                </div>
                <div className="flex items-center justify-center w-full">
                  <button className="inline-flex items-center w-[300px] rounded-[8px] border border-white py-[8px] ">
                    <div className="bg-white rounded-[8px] px-[8px] py-[8px] ml-[10px]">
                      <img src="/presents.svg" className="w-[34px]"></img>
                    </div>
                    <div className="text-[23px] ml-4 font-bold text-white">
                      Regular giveaway
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
