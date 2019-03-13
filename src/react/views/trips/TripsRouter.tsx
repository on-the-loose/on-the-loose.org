import React, { useState } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import useTrips from '@/react/hooks/useTrips'
import Trip from './Trip'
import TripEdit from './TripEdit'
import TripList from './TripList'

export default function TripsRouter({ user }: { user: firebase.User }) {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => (user != null ? <Component {...props} /> : <Redirect to="/trips" />)}
    />
  )

  const [hidePastTrips, setHidePastTrips] = useState(true)
  const [trips, pastTrips] = useTrips(user, hidePastTrips)

  return (
    <div>
      <Route
        path="/trips"
        exact
        component={() => (
          <TripList
            trips={trips}
            pastTrips={pastTrips}
            hidePastTrips={hidePastTrips}
            setHidePastTrips={setHidePastTrips}
          />
        )}
      />
      <PrivateRoute
        path="/trips/:id"
        exact
        component={({ match }) => <Trip id={match.params.id} />}
      />
      <PrivateRoute
        path="/trips/:id/edit"
        exact
        component={({ match }) => <TripEdit id={match.params.id} />}
      />
    </div>
  )
}
