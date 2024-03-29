import { useState } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import useTrips from 'src/utils/hooks/useTrips'
import Trip from './display/Trip'
import TripEdit from './creation/TripEdit'
import TripList from './display/TripList'
import useIsLeader from 'src/utils/hooks/useIsLeader'
import { auth } from 'src/firebase'

export default () => {
  const user = auth.currentUser

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (user != null ? <Component {...props} /> : <Redirect to="/trips" />)}
    />
  )

  const [hidePastTrips, setHidePastTrips] = useState(true)
  const [trips, pastTrips] = useTrips(user, hidePastTrips)
  const isLeader = useIsLeader(user)

  return (
    <div>
      <Route
        path="/trips"
        exact
        component={() => (
          <TripList
            isLeader={isLeader}
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
