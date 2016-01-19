var Navbar = React.createClass({
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
        <ul className="nav nav-tabs toggle-nav">
          <li>
            <a href="#menu-toggle" className={this.state.fullSize ? "" : "hidden"} onClick={this.handleClick}>Show Brands</a>
          </li>
          <li>
            <a href="#menu-toggle" className={this.state.fullSize ? "hidden" : ""} onClick={this.handleClick}>Hide Brands</a>
          </li>
        </ul>
      );
  }
});

React.render(<Navbar />, document.getElementById("navigation"));
