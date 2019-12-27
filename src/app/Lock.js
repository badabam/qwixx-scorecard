import React from 'react'
import { ReactComponent as OpenLock } from '../img/unlock.svg'
import { ReactComponent as ClosedLock } from '../img/lock.svg'

export default function Lock({ isLocked }) {
  return isLocked ? <ClosedLock /> : <OpenLock />
}
