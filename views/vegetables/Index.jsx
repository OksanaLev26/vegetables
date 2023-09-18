const React = require("react");
const vegetables = require("../../models/vegetables");

class Index extends React.Component {
  render() {
    const { vegetable } = this.props;
    
    return (
      <div>
        <h1>Fruits Index Page</h1>
        <ul>
          {vegetables.map((vegetable, i) => {
            return (
              <li>
                The <a href={`/vegetables/${i}`}>{vegetable.name}</a> is {vegetable.color}{" "}
                <br></br>
                {vegetable.readyToEat
                  ? `It is ready to eat`
                  : `It is not ready to eat`}
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
module.exports = Index;
