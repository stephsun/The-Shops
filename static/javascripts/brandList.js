var BrandTable = React.createClass({
  getInitialState: function () {
    return {data: []};
  },
  handleBrandSubmit: function (brand) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: brand,
      success: function(data) {
        var brands = this.state.data;
        var newBrands = brands.concat([brand]);
        this.setState({data: newBrands});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleBrandDelete: function (brand) {
    console.log('brand delete', brand);
    $.ajax({
      url: this.props.url,
      type: 'DELETE',
      data: brand,
      success: function(data) {
        console.log('after deleting', data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function () {
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
    var self = this;
    var brandNodes = this.state.data.map(function (brand) {
      return (
        <Brand brand={brand} onBrandDelete={self.handleBrandDelete} />
      );
    });
    return (
      <div>
        <BrandForm onBrandSubmit={this.handleBrandSubmit} />
        <br/>
        <table className="brandTable table table-hover">
          <thead>
            <tr>
              <th>Brand Name</th>
              <th>Name</th>
              <th>Website</th>
              <th>No.</th>
              <th>...</th>
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
  handleClick: function (e) {
    e.preventDefault();
    this.props.onBrandDelete(this.props.brand);
  },
  render: function () {
    return (
      <tr className="brand">
        <td>{this.props.brand.name}</td>
        <td>{this.props.brand.longName}</td>
        <td>{this.props.brand.url}</td>
        <td>{this.props.brand.rank}</td>
        <td>
          <div className="btn-group" role="group" aria-label="brandActions">
            <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
            <button type="button" className="btn btn-default" onClick={this.handleClick}><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
          </div>
        </td>
      </tr>
    );
  }
});

var BrandForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var brandName = React.findDOMNode(this.refs.brandName).value.trim();
    var website = React.findDOMNode(this.refs.website).value.trim();
    var rank = React.findDOMNode(this.refs.rank).value.trim();
    if (!brandName || !website || !rank) {
      return;
    }
    this.props.onBrandSubmit({'longName': brandName, 'url': website, 'rank': rank});
    React.findDOMNode(this.refs.brandName).value = '';
    React.findDOMNode(this.refs.website).value = '';
    React.findDOMNode(this.refs.rank).value = '';
    return;
  },
  render: function() {
    return (
      <form className="brandForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label class="sr-only" for="brandName">Brand name</label>
          <input type="text" className="form-control" placeholder="Brand Name" ref="brandName" />
        </div>
        <div className="form-group">
          <label class="sr-only" for="website">Website</label>
          <input type="text" className="form-control" placeholder="Website" ref="website" />
        </div>
        <div className="form-group">
          <label class="sr-only" for="rank">Rank</label>
          <input type="text" className="form-control" placeholder="Rank" ref="rank" />
        </div>
        <button type="submit" className="btn btn-default">POST</button>
      </form>
    );
  }
});

React.render(<BrandTable url="/admin/brands" />, document.getElementById("content"));
