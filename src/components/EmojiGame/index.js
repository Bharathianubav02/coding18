/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.

import {Component} from 'react'
import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../winOrLoseCard'

import './index.css'

class EmojiGame extends Component {
  state = {
    clickedEmojisList: [],
    isGameInProgess: true,
    topScore: 0,
  }

  restGame = () => {
    this.setState({clickedEmojisList: [], isGameInProgess: true})
  }

  renderScoreCard = () => {
    this.setState({clickedEmojisList: [], isGameInProgess: true})
  }

  renderScoreCard = () => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const isWon = clickedEmojisList.length === emojisList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.restGame}
        score={clickedEmojisList.length}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore
    if (currentScore > topScore) {
      newTopScore = currentScore
    }

    this.setState({topScore: newTopScore, isGameInProgess: false})
  }

  clickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const isEmojiPresent = clickedEmojisList.includes(id)
    const clickedEmojisList = clickedEmojisList.length

    if (isEmojiPresent) {
      this.finishGameAndSetTopScore(clickedEmojisList)
    } else {
      if (emojisList.length - 1 === clickedEmojisList) {
        this.finishGameAndSetTopScore(emojisList.length)
      }

      this.setState(previousState => ({
        clickedEmojisList: [...previousState.clickEmojiList, id],
      }))
    }
  }
  getShuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojisList = () => {
    const shuffledEmojisList = this.getShuffledEmojisList()

    return (
      <ul className="emojis-list-container">
        {shuffledEmojisList.map(emojiObject => (
          <EmojiCard
            Key={emojiObject.id}
            emojiDetails={emojiObject}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }
  render() {
    const {clickedEmojisList, isGameInProgess, topScore} = this.state

    return (
      <div className="app-contrainer">
        <NavBar
          currentScore={clickedEmojisList.length}
          isGameInProgess={isGameInProgess}
          topScore={topScore}
        />
        <div className="emoji-game-body">
          {isGameInProgess ? this.renderEmojisList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}
export default EmojiGame
