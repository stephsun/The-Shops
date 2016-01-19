var Logo = React.createClass({
  getInitialState: function () {
    return { fullSize: $(window).width() < 768 };
  },
  handleClick: function (e) {
    if (this.state.fullSize) {
      this.setState({ fullSize:false });
    } else {
      this.setState({ fullSize:true });
    };
    $( "#wrapper" ).toggleClass("toggled");
  },
  render: function () {
    return (
      <div id="logo" onClick={this.handleClick}><a href="#menu-toggle">The Shops</a></div>
    );
  }
});

React.render(<Logo />, document.getElementById("logo_parent"));
