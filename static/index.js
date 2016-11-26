class Tile extends React.Component {
  render() {
    return (
      <div id={"tile-" + this.props.val} className={"tile" + (this.props.active?" tile-active":"")}>
          {this.props.val}
      </div>
    );
  }
}

class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      list: this.genRandomList(7),
      active: 0,
      period: 5000
    }
    setTimeout(() => this.bubble(), this.state.period);
  }

  bubble() {
    var i = this.state.active;
    console.log("bubble", i)
    if (i > this.state.list.length-2) {
      this.setState({
        active: 0
      });
    }

    $.get("http://127.0.0.1:5000/twitch", (data) => {
      console.log(data)
      if (JSON.parse(data)) {
        this.swap(i, i + 1);
      }
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

  genRandomList(l) {
    var arr = [];
    for (var i=0; i<l; i++) {
      var n = Math.floor(Math.random()*100) + 1;  
      if (arr.indexOf(n) === -1) {
        arr.push(n);
      } else {
        i -= 1;
      }
    }

    console.log(arr);
    return arr;
  }
  
  swap(iA, iB) {
    var valA = this.state.list[iA];
    var valB = this.state.list[iB];

    console.log("switching" + valA + "-" + valB);

    // var posA = $('#tile-' + valA).position().left;
    // var posB = $('#tile-' + valB).position().left;
    // var delta = Math.max(posA, posB) - Math.min(posA, posB);
    // console.log("delta", delta)
    // if (posB > posA) {
    //   $('#tile-' + valA)
    //     .animate({left:"+=" + delta}); 
    //   $('#tile-' + valB)
    //     .animate({left:"-=" + delta});
    // } else {
    //   $('#tile-' + valB)
    //     .animate({left:"+=" + delta}); 
    //   $('#tile-' + valA)
    //     .animate({left:"-=" + delta});
    // }

    var newList = this.state.list.slice();
    newList[iA] = this.state.list[iB];
    newList[iB] = this.state.list[iA];

    this.setState({
      list: newList
    });
  }

  render() {
    return (
      <div id="list-container">
        {
          this.state.list.map((val, i) => {
            return <Tile val={val} key={i} active={i == this.state.active || i == this.state.active+1} />;
          })
        }
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));