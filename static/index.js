class Tile extends React.Component {
  render() {
    return (
      <div id={"tile-" + this.props.value} className="list-item">
          {this.props.value}
      </div>
    );
  }
}

class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [5, 7, 1, 2, 6]
    }
    bubble(this.state.list, this.state.list.length-1, 0, elem);

  }
  switch(iA, iB) {
    var valA = this.state.list[iA];
    var valB = this.state.list[iB];

    console.log("onswitch");
    var posA = $('#tile-' + valA).position().left;
    var posB = $('#tile-' + valB).position().left;
    var delta = Math.max(posA, posB) - Math.min(posA, posB);
    if (posB > posA) {
      $('#tile-' + valA)
        .animate({left:"+=" + delta}); 
      $('#tile-' + valB)
        .animate({left:"-=" + delta});
    } else {
      $('#tile-' + valB)
        .animate({left:"+=" + delta}); 
      $('#tile-' + valA)
        .animate({left:"-=" + delta});
    }
  }
  render() {
    return (
      <div id="list-container">
        {
          this.state.list.map(function(i) {
            return <Tile value={i} key={i} />;
          })
        }
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));