import React, { Component, Fragment } from 'react'
import Player from 'react-player'
import Centpn from 'react-centpn'
import Orph from 'orph'
import Atra from 'atra'
import { ThreeBounce } from 'lonogara-sdk/preloader'
import { VideoPlay } from '../Icons.jsx'
import { Cover, MouseDown } from '../Cover.jsx'

const OBJECT_COLOR = 'rgba(255, 255, 255, 0.84)'
const round = (number) => Math.round(number)

const store = new Orph({
  totalDuration: undefined,
  nowDuration: 0,
  casting: false,
  playing: false
})

store.register({

  ON_DURATION: (totalDuration, { state, render }) =>
    state('totalDuration')
    .then((nowTotalDuration) =>
      typeof nowTotalDuration !== 'number' &&
      render({ totalDuration: round(totalDuration) })
    ),

  ON_PROGRESS: ({ playedSeconds }, { state, render }) => {
    const nowDuration = round(playedSeconds)
    state('totalDuration')
    .then((totalDuration) =>
      nowDuration !== totalDuration &&
      render({ nowDuration })
    )
  },

  TOGGLE_PLAYING: (n, { state, render }) =>
    state('playing')
    .then(playing => !playing)
    .then(playing => render({ playing, casting: true })),

  ON_ENDED: (n, { render }) => render({ playing: false, casting: false, nowDuration: 0 })

},{
  use: {
    state: true,
    render: true
  }
})

const listeners = store.order()

const a = Atra({
  ROOT: {
    style: {
      position: 'relative',
      backgroundColor: '#000',
      textAlign: 'center',
      width: '98%',
      height: 450,
      margin: 'auto'
    }
  },
  PLAYER: {
    volume: 1,
    width: '100%',
    height: '100%',
    onDuration: listeners['ON_DURATION'],
    onProgress: listeners['ON_PROGRESS'],
    onEnded: listeners['ON_ENDED']
  },
  POSTER: {
    style: {
      height: '100%',
      objectFit: 'contain'
    }
  },
  PLAY_SVG_WRAPPER: {
    style: {
      display: 'inline-block',
      width: 100
    }
  },
  PLAY_DURATION_WRAPPER: {
    style: {
      color: OBJECT_COLOR,
      fontSize: '0.9em',
      padding: '4px 10px',
      position: 'relative',
      top: -16
    }
  },
  TOGGLE_PLAYING: {
    listener: listeners['TOGGLE_PLAYING']
  }
})

export default class Video extends Component {

  constructor(props) {
    super(props)
    store.attach(this)
  }

  componentWillUnmount() {
    store.detach()
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { totalDuration, casting, playing } = this.state
    return (
      totalDuration !== nextState.totalDuration ||
      casting !== nextState.casting ||
      playing !== nextState.playing
    )
  }

  render() {
    const ready = typeof this.state.totalDuration === 'number'
    const { playing, casting } = this.state
    return (
      <div {...a('ROOT')}>
        <Player {...a('PLAYER', { url: this.props.video, playing })} />
        {!casting && <Cover><img {...a('POSTER', { src: this.props.poster })} /></Cover>}
        <Cover {...{ style: { backgroundColor: (!ready || !playing) && 'rgba(0, 0, 0, 0.42)' } }}>
          {!ready
            ? this.Preload()
            : this.Handler(playing)}
        </Cover>
      </div>
    )
  }

  Preload() {
    return <Centpn><ThreeBounce size={90} objectColor={OBJECT_COLOR} /></Centpn>
  }

  Handler(playing) {
    return (
      <Fragment>
        {!playing && this.PlayButton()}
        <MouseDown {...a('TOGGLE_PLAYING')} />
      </Fragment>
    )
  }

  PlayButton() {
    const { nowDuration, totalDuration } = this.state
    return (
      <Centpn>
        <span {...a('PLAY_SVG_WRAPPER')}>
          <VideoPlay fill={OBJECT_COLOR} />
        </span>
        <br />
        <span {...a('PLAY_DURATION_WRAPPER')}>
          {nowDuration !== 0 && '残り '}{`${totalDuration - nowDuration}秒`}
        </span>
      </Centpn>
    )
  }
}

// this.ref = setMethodScreenFull.bind(this)
// ref: this.ref,
// function setMethodScreenFull(reactPlayer) {
//   if (reactPlayer) {
//     const video = reactPlayer.player.player.player
//     this.screenfull = (method) => screenfull[method](video)
//   } else {
//     delete this.screenfull
//   }
// }