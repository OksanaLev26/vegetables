const React = require("react");
const DefaultLayout = require("../layouts/default");
// const vegetables = require("../../models/vegetables");

class Index extends React.Component {
  render() {
    const { vegetables } = this.props;
    
    return (
      <DefaultLayout title={"Vegetables Index Page"}>
        <ul>
        {vegetables.map((vegetable, i) => {
            return (
              <li key={i}>
                The <a href={`/vegetables/${vegetable.id}`}>{vegetable.name}</a>
                {" "} is {vegetable.color}.{" "}
                {vegetable.readyToEat ? (
                  <span>It is ready to eat</span>
                ) : (
                  <span> It is not ready to eat </span>
                )}
                {/* Your Delete Form Goes Here  It's incomplete we will fix below*/}
                <form
                  action={`/vegetables/${vegetable._id}?_method=DELETE`}
                  method="POST"
                >
                  <input type="submit" value="DELETE" />
                </form>
                <a href={`/vegetables/${vegetable._id}/edit`}>Edit This Vegetable</a>
              </li>
            );
          })}
        </ul>
        <nav>
          <a href="/vegetables/new">Create a New Vegetable</a>
        </nav>
      </DefaultLayout>
    );
  }
}
module.exports = Index;
