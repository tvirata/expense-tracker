function Item({ value }) {
    return (
        <li className="menu-item">{value}</li>
    );
  }
  
  export default function main() {
    let isLoggedIn = false;
    return (
      <>
          <ul className="menu">
            <Item value="Home" />
            <Item value="My History" />
            <Item value="Goals" />
            <Item value="About Us" />
            <li className="blank"></li>
            <Item value={isLoggedIn ? "Log Out" : "Log In"} />
          </ul>
        <h1>Expense Tracker</h1>
        <h2>Log Your Purchases</h2>
        <p>
          This app allows you to log each of your purchases to help you 
          know how much you spend, keep track of your spending habits, 
          see where your money is going. All of your purchases are saved
          in the My History tab. 
        </p>
        <h2>Make Goals and Limit Spending</h2>
        <p>
          You can add goals to try to reduce spending if you feel 
          that you're spending to much. You can add daily limits and
          adjust the individual limit in each category. If your next
          purchase is going to go over the limit, you will be warned 
          before you are able to put it in. 
        </p>
        <h2>Get Started</h2>
        <p>
          You can get started by either logging into your existing 
          account or creating a new account if you're a new user. 
        </p>
        <footer>December 3rd, 2023</footer>
      </>
    );
  }