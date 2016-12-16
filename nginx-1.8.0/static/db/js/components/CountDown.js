var React = require('react')
var moment = require('moment')

var TICK_INTERVAL = 50

var CountDown = React.createClass({
  getInitialState: function() {
    return {
      time: this.props.time
    }
  },

  componentDidMount: function() {
    this.int = setInterval(this._tick, TICK_INTERVAL)
  },

  componentWillReceiveProps: function(nextProps) {
    clearInterval(this.int)
    this.setState({
      time: nextProps.time
    })
    this.int = setInterval(this._tick, TICK_INTERVAL)
  },

  componentWillUnmount: function() {
    clearInterval(this.int)
  },

  render: function() {
    var d = moment.duration(this.state.time, 'milliseconds')
    if (this.state.time < 0) {
      return (
        <div className="count-down">
        {this.props.tag}{0 + ':' + 0 + ':' + 0 + ':' + 0}
        </div>
        )
    }
    return (
      <div className="count-down">
        {this.props.tag}{d.hours() + ':' + d.minutes() + ':' + d.seconds() + ':' + d.milliseconds()}
      </div>
      )
  },

  _tick: function() {
    var rest = this.state.time - TICK_INTERVAL
    if (rest <= 0) {
      clearInterval(this.int)
      this.setState({
        time: 0
      })
      if (typeof this.props.onComplete === 'function') {
        this.props.onComplete()
      }
      return
    }

    this.setState({
      time: rest
    })

  }
})

module.exports = CountDown