import React from "react";

var SetIntervalMixin = {
  componentWillMount: function() {
    console.warn("mixin: componentWillMount");
    this.intervals = [];
  },

  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },

  componentWillUnmount: function() {
    console.warn("mixin: componentWillUnmount");
    this.intervals.forEach(clearInterval);
  }
};

var TickTock = React.createClass({
  mixins: [SetIntervalMixin], // 引用 mixin

  propType: {
    value: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      value: "default value"
    };
  },

  getInitialState: function() {
    return { seconds: 0 };
  },

  componentDidMount: function() {
    console.warn("component: componentDidMount");
    this.setInterval(this.tick, 1000); // 调用 mixin 的方法
  },

  tick: function() {
    this.setState({ seconds: this.state.seconds + 1 });
  },

  render: function() {
    return <p>React has been running for {this.state.seconds} seconds.</p>;
  }
});

export default TickTock;
