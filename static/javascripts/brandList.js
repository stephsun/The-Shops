var NewBrand = React.createClass({
    getInitialState: function () {
        return {
            name: "",
            url: "",
        };
    },
    handleNameChange: function (event) {
        this.setState({ name: event.target.value })
    },
    handleUrlChange: function (event) {
        this.setState({ url: event.target.value })
    },
    render: function () {
        return (
            <tr>
                <td><input type="text" name="name" onChange={this.handleNameChange} /></td>
                <td><input type="text" name="longName" /></td>
                <td><input type="text" name="url" onChange={this.handleUrlChange} /></td>
                <td><input type="text" name="rank" /></td>
                <td>
                    <button type="button" className="btn btn-default" disabled={this.state.name.length === 0 || this.state.url.length === 0}>Add</button>
                </td>
            </tr>
            );
    }
});

var Brand = React.createClass({
    render: function () {
        var brand = this.props.brand;
        return (
            <tr>
                <td>{brand.longName}</td>
                <td>{brand.name}</td>
                <td>{brand.url}</td>
                <td>{brand.rank}</td>
                <td>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-default">Edit</button>
                        <button type="button" className="btn btn-default">Delete</button>
                    </div>
                </td>
            </tr>
            );
    }
});

var BrandList = React.createClass({
    getInitialState: function () {
        return {
            brands: []
        };
    },
    componentWillMount: function () {
        $.get(this.props.source, function (data) {
            this.setState({
                brands: data
            });
        }.bind(this));
    },
    render: function() {
        var source = this.props.source;
        var trs = [];
        for (var i = 0; i < this.state.brands.length; i++) {
            trs.push(<Brand brand={ this.state.brands[i] } />);
        }
        return (
            <table className="table table-striped table-hover">
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
                    <NewBrand />
                    {trs}
                </tbody>
            </table>
            );
    }
});
 
React.render(<BrandList source="/admin/all" />, document.getElementById('example'));