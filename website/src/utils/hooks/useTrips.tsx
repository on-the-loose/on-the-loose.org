import { User } from 'firebase/auth'
import {
  query,
  collection,
  where,
  Timestamp,
  orderBy,
  onSnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from 'src/firebase'

export default (user: User, hidePastTrips: boolean) => {
  const [trips, setTrips] = useState<QueryDocumentSnapshot[]>(null)
  const [pastTrips, setPastTrips] = useState<QueryDocumentSnapshot[]>(null)

  useEffect(() => {
    if (!user) return

    const currentTripsQuery = query(
      collection(db, 'cities'),
      where('dates.start', '>', Timestamp.now()),
      orderBy('dates.start', 'asc')
    )

    const unsubscribe = onSnapshot(currentTripsQuery, (qs) => setTrips(qs.docs))

    if (hidePastTrips) return () => unsubscribe()

    const pastTripsQuery = query(
      collection(db, 'cities'),
      where('dates.start', '<', Timestamp.now()),
      orderBy('dates.start', 'desc')
    )

    const unsubscribePast = onSnapshot(pastTripsQuery, (qs) => setPastTrips(qs.docs))

    return () => {
      unsubscribe()
      unsubscribePast()
    }
  }, [hidePastTrips, user])

  return [trips, pastTrips]
}
