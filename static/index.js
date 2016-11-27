class Tile extends React.Component {
  render() {
    return (
      <div id={"tile-" + this.props.i} className={"tile" + (this.props.active?" tile-active":"")}>
          {this.props.val}
      </div>
    );
  }
}

class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [1, 2, 3, 4, 5],
      ids: [0, 1, 2, 3, 4],
      active: 0,
      period: 1000,
      count: 0
    }
    setTimeout(() => this.bubble(), this.state.period);
  }

  bubble() {
    var i = this.state.active;
    console.log("bubble", i);
    if (i > this.state.list.length-2) {
      this.setState({
        active: 0
      });
    }

    $.get("http://127.0.0.1:5000/twitch", (data) => {
      console.log(data, this.state.count);
      if (JSON.parse(data) || this.state.count < 2) {
        this.setState({count: this.state.count + 1});
        this.swap(i, i + 1);

      } else {return;}
      this.setState({
        active: (i + 1) % (this.state.list.length - 1)
      });
      if (!this.equal(this.state.list, this.state.list.slice().sort())) {
        setTimeout(() => this.bubble(), this.state.period);
      }
    });
  }

  equal(a1, a2) {
    if (a1.length != a2.length) {
      return false;
    }

    for (var i=0; i<a1.length; i++) {
      if (a1[i] != a2[i]) {
        return false;
      }
    }
    return true;
  }

  swap(A, B) {
    var a = this.state.ids[A];
    var b = this.state.ids[B];

    console.log("switching", A, a, "with", B, b);

    var newList = this.state.list.slice();
    newList[a] = this.state.list[b];
    newList[b] = this.state.list[a];

    var newIds = this.state.ids.slice();
    newIds[a] = this.state.ids[b];
    newIds[b] = this.state.ids[a];

    this.setState({
      list: newList,
      ids: newIds
    });

    var posA = $("#tile-" + a).offset().left;
    var posB = $("#tile-" + b).offset().left;
    var delta = Math.max(posA, posB) - Math.min(posA, posB);
    console.log("posA", posA);
    console.log("posB", posB);
    console.log("delta", delta);
    if (posB > posA) {
      $("#tile-" + a)
        .animate({left:"+=" + delta}); 
      $("#tile-" + b)
        .animate({left:"-=" + delta});
    } else {
      $("#tile-" + b)
        .animate({left:"+=" + delta}); 
      $("#tile-" + a)
        .animate({left:"-=" + delta});
    }
  }

  render() {
    return (
      <div id="list-container">
        {
          this.state.list.map((val, i) => {
            return <Tile key={this.state.ids[i]} i={this.state.ids[i]} val={val} active={this.state.ids[i] == this.state.active || this.state.ids[i] == this.state.active+1} />;
          })
        }
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById("app"));