var React = require('react');
var Canvas = require('../views/Canvas.jsx');
var storyAction=require('../actions/story-action');



var AppController = React.createClass({

  propTypes: {
    layoutStore: React.PropTypes.object,
    storyStore: React.PropTypes.object
  },

  getInitialState: function () {
    return {
      storyData: {},
      layoutData: []
    }
  },

  componentWillMount: function () {
    this.storyStateChanged();
    this.props.action.registerEvent();
  },

  //@UnBind: store with state
  componentWillUnmount: function () {
    this.props.storyStore.unbind('change', this.storyStateChanged);
    this.props.action.deRegisterEvent();
  },

  //@Bind: Store with state
  componentDidMount: function () {
    this.props.storyStore.bind('change', this.storyStateChanged);
  },

  storyStateChanged: function () {
    this.setState({
      storyData: this.props.storyStore.getStoreData(),
      layoutData: this.props.layoutStore.getStoreData()
    });
  },

  render: function () {
    console.log("In app controller....\n");
    return (
        <div className="appController">
          <Canvas
              layoutStoreData={this.state.layoutData}
              storyStoreData={this.state.storyData}
              action={storyAction}/>
        </div>
    );
  }
});

module.exports = AppController;