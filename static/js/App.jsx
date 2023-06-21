function App() {
  // initializes melons as state variable using useState hook
  // initial state is empty object {} and setMelons is function used to update the melons state
  const [melons, setMelons] = React.useState({});

  // starts declaration of useEffect hook to perform side effects in components
  React.useEffect(() => {
    // uses fetch API to send HTTP GET request to server
    fetch("/api/melons")
      // promise chain, handles response from server
      // extracts json data from response object, result is another promise
      .then((response) => response.json())
      // continuation of promise chain, json data is extracted and passed to arrow function as melonData
      // setMelons function called with melonData as argument to update melons state
      .then((melonData) => setMelons(melonData));
      // empty dependency array: effect should only run once when the component mounts
      // no dependencies listed means effect will not re-run if any state or prop changes
      // ensures fetch request is made only on the initial page load
  }, []);

  return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="/static/img/watermelon.png" brand="Ubermelon" />
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/">
          <Homepage />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/shop">
          <AllMelonsPage melons={melons} />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/cart">
          <ShoppingCartPage />
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
