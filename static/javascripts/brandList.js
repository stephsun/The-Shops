var BrandTable = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  handleBrandSubmit: function(brandName, website, rank) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {'longName': brandName, 'url': website, 'rank': rank},
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    var brandNodes = this.state.data.map(function (brand) {
      return (
        <Brand brand={brand} />
      );
    });
    return (
      <div>
        <BrandForm onBrandSubmit={this.handleBrandSubmit}/>
        <table className="brandTable table table-striped table-hover">
          <thead>
            <tr>
              <th>Brand Name</th>
              <th>Name</th>
              <th>Website</th>
              <th>No.</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brandNodes}
          </tbody>
        </table>
      </div>
    );
  }
});

var Brand = React.createClass({
  render: function () {
    return (
      <tr className="brand">
        <td>{this.props.brand.name}</td>
        <td>{this.props.brand.longName}</td>
        <td>{this.props.brand.url}</td>
        <td>{this.props.brand.rank}</td>
      </tr>
    );
  }
});

var BrandForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var brandName = React.findDOMNode(this.refs.brandName).value.trim();
    var website = React.findDOMNode(this.refs.website).value.trim();
    var rank = React.findDOMNode(this.refs.rank).value.trim();
    if (!brandName || !website || !rank) {
      return;
    }
    this.props.onBrandSubmit(brandName, website, rank);
    React.findDOMNode(this.refs.brandName).value = '';
    React.findDOMNode(this.refs.website).value = '';
    React.findDOMNode(this.refs.rank).value = '';
    return;
  },
  render: function() {
    return (
      <form className="brandForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Brand Name" ref="brandName" />
        <input type="text" placeholder="Website" ref="website" />
        <input type="text" placeholder="Rank" ref="rank" />
        <input type="submit" className="btn btn-default" value="Post" />
      </form>
    );
  }
});

React.render(<BrandTable url="/admin/all" />, document.getElementById("example"));
