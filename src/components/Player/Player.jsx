import src_0 from "../../audio/All_Too_Well.mp3"
import src_1 from "../../audio/Could_You_Be_Loved.mp3"
import src_2 from "../../audio/Roots_Rock_Reggae.mp3"
import src_3 from "../../audio/Three_Little_Birds.mp3"
import src_4 from "../../audio/Sun_Is_Shining.mp3"
import src_5 from "../../audio/Bamboleo.mp3"
import src_6 from "../../audio/Rock_and_roll_music.mp3"
import { useEffect, useMemo, useRef, useState } from 'react';
import Player_Stayles from "./Player.module.css"
import { FaBackward } from "react-icons/fa6";
import { FaForward } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";


function Player() {

    const idRef = useRef()
    const range_container = useRef()
    const lengthRef = useRef()
    const scrollRef = useRef()
    const selectedRef = useRef()

    const [time, setTime] = useState(0)
    const [range, setRange] = useState(0)
    const [minut, setMinut] = useState(0)
    const [isMinute, setIsMinute] = useState(false)
    const [zero, setZero] = useState(0)
    const [play, setPlay] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [start, setStart] = useState(true)
    const [goPlay, setGoPlay] = useState(false)
    const [music_duration, setMusic_duration] = useState("")

    const sourcs = useMemo(() => {
        return [src_0, src_1, src_2, src_3, src_4, src_5, src_6]
    }, [])

    const audio = useMemo(() => {
        return new Audio(sourcs[currentIndex])
    }, [])


    const SetDuration = () => {
        let minut = parseInt((parseInt(audio.duration) / 60))
        let second = parseInt((parseInt(audio.duration) % 60))
        let time = `${minut}:${second}`
        setMusic_duration(time)
    }

    const SetRange = () => {
        lengthRef.current = range_container.current.offsetWidth - 2
        idRef.current = setInterval(() => {
            setRange((lengthRef.current * audio.currentTime) / audio.duration)
            setTime(prev => {
                return prev + 1
            })

            if (audio.currentTime === audio.duration) {
                console.log("eee")
                setCurrentIndex(currentIndex + 1)
                setTime(0)
                setMinut(0)
                setStart(false)
                clearInterval(idRef.current)
                setPlay(true)
                setGoPlay(true)
            }

        }, 1000)
    }

    useEffect(() => {
        if (play) {
            audio.src = sourcs[currentIndex]
            audio.play()
            SetRange()
            scroll_to_selected_music(currentIndex)
        }

    }, [currentIndex])

    useEffect(() => {
        if (goPlay) {
            SetDuration()
        }
    }, [audio.src])

    useEffect(() => {
        if (time === 59) {
            setTime(0)
            setMinut(minut + 1)
            setIsMinute(true)
            if (minut === 9) {
                setZero("")
            }
        }
    }, [range, time, minut])


    const handlerPlay = (e) => {
        if (start) {
            audio.play()
            SetRange()
            setStart(false)
            setGoPlay(true)
            SetDuration()
        }
    }

    const handlerPause = (e) => {
        audio.pause()
        clearInterval(idRef.current)
        setStart(true)
        setGoPlay(false)
    }

    const handlerNext = () => {
        if (currentIndex === sourcs.length - 1) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 1)
        }
        setTime(0)
        setMinut(0)
        setStart(false)
        clearInterval(idRef.current)
        setPlay(true)
        setGoPlay(true)
    }

    const handlerPrev = () => {
        if (currentIndex === 0) {
            setCurrentIndex(sourcs.length - 1)
        } else {
            setCurrentIndex(currentIndex - 1)
        }
        setTime(0)
        setMinut(0)
        setStart(false)
        clearInterval(idRef.current)
        setPlay(true)
        setGoPlay(true)
        SetDuration()
    }

    const handlerAraj = (e) => {

        setRange(e.nativeEvent.offsetX)

        audio.currentTime = (audio.duration * e.nativeEvent.offsetX) / lengthRef.current
        console.log(audio.duration)
        console.log(audio.currentTime)


        if (audio.currentTime - 60 > 0) {
            setIsMinute(true)
        }

        if (audio.currentTime - 60 < 540) {
            setZero(0)
        }

        if (audio.currentTime - 60 < 0) {
            setTime(parseInt(audio.currentTime))
            setIsMinute(false)
        } else if (audio.currentTime - 60 > 0 && audio.currentTime - 60 < 60) {
            setMinut(1)
            setTime(parseInt(audio.currentTime - 60))
        } else if (audio.currentTime - 120 > 0 && audio.currentTime - 120 < 60) {
            setMinut(2)
            setTime(parseInt(audio.currentTime - 120))
        } else if (audio.currentTime - 180 > 0 && audio.currentTime - 180 < 60) {
            setMinut(3)
            setTime(parseInt(audio.currentTime - 180))
        } else if (audio.currentTime - 240 > 0 && audio.currentTime - 240 < 60) {
            setMinut(4)
            setTime(parseInt(audio.currentTime - 240))
        } else if (audio.currentTime - 300 > 0 && audio.currentTime - 300 < 60) {
            setMinut(5)
            setTime(parseInt(audio.currentTime - 300))
        }
        else if (audio.currentTime - 360 > 0 && audio.currentTime - 360 < 60) {
            setMinut(6)
            setTime(parseInt(audio.currentTime - 360))
        } else if (audio.currentTime - 420 > 0 && audio.currentTime - 420 < 60) {
            setMinut(7)
            setTime(parseInt(audio.currentTime - 420))
        } else if (audio.currentTime - 480 > 0 && audio.currentTime - 480 < 60) {
            setMinut(8)
            setTime(parseInt(audio.currentTime - 480))
        } else if (audio.currentTime - 540 > 0 && audio.currentTime - 540 < 60) {
            setMinut(9)
            setTime(parseInt(audio.currentTime - 540))
        } else if (audio.currentTime - 600 > 0 && audio.currentTime - 600 < 60) {
            setZero("")
            setMinut(10)
            setTime(parseInt(audio.currentTime - 600))
        }
    }

    const handlerSelect_music_from_list = (index) => {
        setCurrentIndex(index)
        setTime(0)
        setMinut(0)
        setStart(false)
        clearInterval(idRef.current)
        setPlay(true)
        setGoPlay(true)
        SetDuration()
    }

    const scroll_to_selected_music = (i) => {
        const target_music = document.querySelectorAll(".selected")
        target_music.forEach((elem, index) => {
            if (index === i) {
                const y = elem.offsetHeigth
                console.dir(y)
                elem.scrollIntoView(y)
            }
        })
    }

    return (
        <div className={`${Player_Stayles.container}`}>

            <div className={`${Player_Stayles.player}`}>

                <div className={`${Player_Stayles.player_top_container}`}>

                    <div className={`${Player_Stayles.img_container}`}>
                        <img src={require(`../../imges/${currentIndex}.jpg`)} />
                    </div>

                    <p
                        className={`${Player_Stayles.music_name}`}
                    >
                        {sourcs[currentIndex].split(".")[0].split("/")[3]}
                    </p>

                    <div
                        onClick={(e) => handlerAraj(e)}
                        ref={range_container}
                        className={`${Player_Stayles.rangre_container}`}
                    >
                        <div
                            className={`${Player_Stayles.goRange}`}
                            style={{ width: range + "px" }}>
                        </div>

                        <div
                            className={`${Player_Stayles.current_time}`}
                            style={{ width: "30px", height: "30px" }}
                        >

                            {
                                isMinute
                                    ?
                                    `${zero}${minut}:${time}`
                                    :
                                    time
                            }
                        </div>

                        <div
                            className={`${Player_Stayles.music_duration}`}
                            style={{ width: "30px", height: "30px" }}
                        >

                            {
                                music_duration
                            }
                        </div>
                    </div>

                    <div className={`${Player_Stayles.music_controler}`}>
                        <FaBackward
                            onClick={handlerPrev}
                            className={`${Player_Stayles.prev}`}
                        />
                        {
                            goPlay
                                ?
                                < FaPause
                                    onClick={(e) => handlerPause(e)}
                                    className={`${Player_Stayles.pause}`}
                                />
                                :
                                < FaPlay
                                    onClick={(e) => handlerPlay(e)}
                                    className={`${Player_Stayles.play}`}
                                />
                        }



                        <FaForward
                            onClick={handlerNext}
                            className={`${Player_Stayles.next}`}
                        />

                    </div>

                </div>



                <div
                    ref={scrollRef}
                    className={`${Player_Stayles.player_bottom_container}`}>

                    {
                        sourcs.map((music, index) => {
                            return (
                                <div
                                    onClick={(e) => {
                                        console.log(e)
                                        handlerSelect_music_from_list(index)
                                    }}
                                    key={index}
                                    className={`${Player_Stayles.music_list_every_song_info} selected`}
                                >
                                    <div className={`${Player_Stayles.music_list_every_song_info_inner_container} ${currentIndex === index ? Player_Stayles.active : ""}`}>
                                        <div className={`${Player_Stayles.music_list_img_container}`}>
                                            <img src={require(`../../imges/${index}.jpg`)} />
                                        </div>

                                        <div className={`${Player_Stayles.music_list_music_name}`}>
                                            <span>
                                                {music.split(".")[0].split("/")[3]}
                                            </span>
                                        </div>

                                        <div className={`${Player_Stayles.music_list_music_duration}`}>
                                            <span>
                                                {
                                                    currentIndex === index
                                                        ?
                                                        music_duration
                                                        :
                                                        ""
                                                }
                                            </span>

                                        </div>

                                    </div>

                                </div>
                            )
                        })
                    }

                </div>

            </div>

        </div>
    );
}

export default Player;
