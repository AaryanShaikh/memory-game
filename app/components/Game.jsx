import React, { useEffect, useState } from 'react'
import styles from '../styles/Game.module.css'

const Game = ({ difficulty }) => {
    const [level, setlevel] = useState(1)
    const [memory, setmemory] = useState([])
    const [currMemory, setcurrMemory] = useState(0)
    const [iteration, setiteration] = useState(null)
    const [valToAdd, setvalToAdd] = useState(difficulty == "Easy" ? 1 : difficulty == "Medium" ? 2 : 3)
    const [playerIteration, setplayerIteration] = useState(0)
    const [currCardClicked, setcurrCardClicked] = useState(0)
    const [isCorrect, setisCorrect] = useState(false)
    const [isLvlComplete, setisLvlComplete] = useState(false)
    const [isLvlFail, setisLvlFail] = useState(false)
    const [isIterating, setisIterating] = useState(true)

    useEffect(() => {
        let temp = []
        for (let index = 0; index < level * valToAdd; index++) {
            if (index != 0) {
                let random = Math.floor(Math.random() * 4) + 1
                while (temp[temp.length - 1] === random) {
                    random = Math.floor(Math.random() * 4) + 1
                }
                temp.push(random)
            } else {
                temp.push(Math.floor(Math.random() * 4) + 1)
            }
        }
        setmemory(temp)
        setiteration(0)
    }, [])

    useEffect(() => {
        if (iteration != null) {
            setisIterating(true)
            if (iteration <= memory.length) {
                setTimeout(() => {
                    setcurrMemory(memory[iteration])
                    setiteration(iteration + 1)
                }, 700)
            } else {
                setcurrMemory(0)
                setisIterating(false)
            }
        }
    }, [iteration])

    useEffect(() => {
        if (memory.length != 0) {
            if (playerIteration >= memory.length) {
                if (isCorrect) {
                    setisLvlComplete(true)
                    setTimeout(() => {
                        setisLvlComplete(false)
                        setcurrCardClicked(0)
                        setplayerIteration(0)
                        onLoadMemory(level + 1)
                        setlevel(prev => prev + 1)
                    }, 700)
                } else {
                    setisLvlFail(true)
                }
            }
        }
    }, [playerIteration])

    const onLoadMemory = (level) => {
        let temp = []
        for (let index = 0; index < level * valToAdd; index++) {
            if (index != 0) {
                let random = Math.floor(Math.random() * 4) + 1
                while (temp[temp.length - 1] === random) {
                    random = Math.floor(Math.random() * 4) + 1
                }
                temp.push(random)
            } else {
                temp.push(Math.floor(Math.random() * 4) + 1)
            }
        }
        setmemory(temp)
        setiteration(0)
    }

    const onCardClicked = (value, ind) => {
        if (memory[ind] != value) {
            setisLvlFail(true)
        }
        setisCorrect(memory[ind] == value)
        setcurrCardClicked(value)
        setplayerIteration(prev => prev + 1)
    }

    const onRetry = () => {
        onLoadMemory(1)
        setlevel(1)
        setisLvlFail(false)
        setcurrCardClicked(0)
        setplayerIteration(0)
    }

    return (
        <div className={styles.main}>
            <h3>Level <span className={isLvlComplete ? styles.win : isLvlFail ? styles.lose : styles.normal}>{level}</span></h3>
            <div className={styles.row}>
                <div
                    className={`${styles.image} ${currMemory == 1 ? styles.highlight : ""} ${currCardClicked == 1 ? isCorrect ? styles.correct : styles.wrong : ""}`}
                    onClick={() => { isLvlFail || isIterating ? "" : onCardClicked(1, playerIteration) }}
                >
                    <img src="../../assets/ace_of_spades.png" alt="" />
                </div>
            </div>
            <div className={styles.row}>
                <div
                    className={`${styles.image} ${currMemory == 2 ? styles.highlight : ""} ${currCardClicked == 2 ? isCorrect ? styles.correct : styles.wrong : ""}`}
                    onClick={() => { isLvlFail || isIterating ? "" : onCardClicked(2, playerIteration) }}
                >
                    <img src="../../assets/queen_of_hearts.png" alt="" />
                </div>
                <div>
                    <button onClick={() => { onRetry() }} style={{ transform: `scale(${isLvlFail ? "1" : "0"})` }}>Retry ?</button>
                </div>
                <div
                    className={`${styles.image} ${currMemory == 4 ? styles.highlight : ""} ${currCardClicked == 4 ? isCorrect ? styles.correct : styles.wrong : ""}`}
                    onClick={() => { isLvlFail || isIterating ? "" : onCardClicked(4, playerIteration) }}
                >
                    <img src="../../assets/king_of_diamonds.png" alt="" />
                </div>
            </div>
            <div className={styles.row}>
                <div
                    className={`${styles.image} ${currMemory == 3 ? styles.highlight : ""} ${currCardClicked == 3 ? isCorrect ? styles.correct : styles.wrong : ""}`}
                    onClick={() => { isLvlFail || isIterating ? "" : onCardClicked(3, playerIteration) }}
                >
                    <img src="../../assets/jack_of_clubs.png" alt="" />
                </div>
            </div>
        </div >
    )
}

export default Game