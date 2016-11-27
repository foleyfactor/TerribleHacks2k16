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
      console.log(data);
      var data = JSON.parse(data);
      if (data["trues"] > data["falses"]) {
        this.swap(i, i + 1);
      }
      this.setState({
        voteText: "Yes: " + data["trues"] + "\t No: " + data["falses"],
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

    var newList = this.state.list.slice();
    newList[iA] = this.state.list[iB];
    newList[iB] = this.state.list[iA];

    this.setState({
      list: newList
    });

    var posA = $('#tile-' + valA).position().left;
    var posB = $('#tile-' + valB).position().left;
    var delta = Math.max(posA, posB) - Math.min(posA, posB);
    console.log("delta", delta)
    if (posB > posA) {
      $('#tile-' + valA)
        .animate({left:"+=" + delta}, () => {$('#tile-' + valA).attr("style", "")}); 
      $('#tile-' + valB)
        .animate({left:"-=" + delta}, () => {$('#tile-' + valB).attr("style", "")});
    } else {
      $('#tile-' + valB)
        .animate({left:"+=" + delta}, () => {$('#tile-' + valB).attr("style", "")}); 
      $('#tile-' + valA)
        .animate({left:"-=" + delta}, () => {$('#tile-' + valA).attr("style", "")});
    }
  }

  render() {
    return (
      <div>
        <div id="list-container">
          {
            this.state.list.map((val, i) => {
              return <Tile val={val} key={i} active={i == this.state.active || i == this.state.active+1} />;
            })
          }
        </div>
        <p>{this.state.voteText}</p>
        <p>Is the number on the right greater than the one on the left? (Type y/n)</p>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));