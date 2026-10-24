// React and ReactDOM imports are required by the activity instructions
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
/* eslint-enable no-unused-vars */
import { UserCard } from './UserCards.jsx';

function App() {
  return (
    // Challenge: Bootstrap flex utilities place the cards side by side
    <div className="d-flex flex-wrap justify-content-center">
      <div>
        <UserCard
          picture="https://media.wired.com/photos/6862cb0455100d2a2bbf7a4b/1:1/w_2560%2Cc_limit/Zuck-Welcomes-Superintelligence-Team-Business-2170596573.jpg"
          name="Mark Zuckerberg"
          amount={300000}
          married={true}
          address={{
            street: "2231 W Holcombe Blvd",
            city: "San Francisco",
            state: "California",
          }}
        />
      </div>
      <div>
        <UserCard
          picture="https://hips.hearstapps.com/hmg-prod/images/bill-gates-discusses-his-new-book-how-to-prevent-the-next-news-photo-1742328104.pjpeg"
          name="Bill Gates"
          amount={650000}
          married={true}
          address={{ street: "49690 Rogers Rd NE", city: "Seattle", state: "WA" }}
        />
      </div>
    </div>
  );
}

export default App;
