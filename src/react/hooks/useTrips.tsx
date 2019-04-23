import { useEffect, useState } from 'react'
import firebase from '@/firebase'

export default function useTrips(user, hidePastTrips) {
  const db = firebase.firestore()

  const [trips, setTrips] = useState<firebase.firestore.QueryDocumentSnapshot[]>(null)
  const [pastTrips, setPastTrips] = useState<firebase.firestore.QueryDocumentSnapshot[]>(null)

  useEffect(() => {
    if (!user) return

    let trips = db
      .collection('trips')
      .where('dates.start', '>', firebase.firestore.Timestamp.now())
      .orderBy('dates.start', 'asc')

    const unsubscribe = trips.onSnapshot(qs => setTrips(qs.docs))

    if (hidePastTrips) return () => unsubscribe()

    let past_trips = db
      .collection('trips')
      .where('dates.start', '<', firebase.firestore.Timestamp.now())
      .orderBy('dates.start', 'desc')

    const unsubscribe_past = past_trips.onSnapshot(qs => setPastTrips(qs.docs))

    return () => {
      unsubscribe()
      unsubscribe_past()
    }
  }, [hidePastTrips, user])

  return [trips, pastTrips]
}
