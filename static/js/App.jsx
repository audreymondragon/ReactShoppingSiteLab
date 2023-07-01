function App() {
  // initializes melons as state variable using useState hook
  // initial state is empty object {} and setMelons is function used to update the melons state
  const [melons, setMelons] = React.useState({});
// create state value called shoppingCart and sets initial state to an empty object
  const [shoppingCart, setShoppingCart] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  // starts declaration of useEffect hook to perform side effects in components
  React.useEffect(() => {
    setLoading(true);
    // uses fetch API to send HTTP GET request to server
    fetch("/api/melons")
      // promise chain, handles response from server
      // extracts json data from response object, result is another promise
      .then((response) => response.json())
      // continuation of promise chain, json data is extracted and passed to arrow function as melonData
      // setMelons function called with melonData as argument to update melons state
      .then((melonData) => {
        setMelons(melonData);
        setLoading(false);
      });
      // empty dependency array: effect should only run once when the component mounts
      // no dependencies listed means effect will not re-run if any state or prop changes
      // ensures fetch request is made only on the initial page load
  }, []);

  // the following useEffect is part of the further study
  React.useEffect(() => {
    const previousCart = localStorage.getItem('shoppingCart');
    if (previousCart) {
      setShoppingCart(JSON.parse(previousCart));
    }
  }, []);

  // the following useEffect is also part of the further study
  React.useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  function addMelonToCart(melonCode) {
    setShoppingCart((currentShoppingCart) => {
      // this makes a copy of the shopping cart since you should
      // never modify the state value directly
      //const newShoppingCart = Object.assign({}, currentShoppingCart);
      const newShoppingCart = { ...currentShoppingCart };
      
      if (newShoppingCart[melonCode]) {
        newShoppingCart[melonCode] += 1;
      } else {
        newShoppingCart[melonCode] = 1;
      }
      return newShoppingCart;
    });
  }

  return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="/static/img/watermelon.png" brand="Ubermelon" />
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/">
          <Homepage />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/shop">
          <AllMelonsPage melons={melons} addMelonToCart={addMelonToCart} />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/cart">
          {loading ? <Loading /> : <ShoppingCartPage cart={shoppingCart} melons={melons} />}
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
