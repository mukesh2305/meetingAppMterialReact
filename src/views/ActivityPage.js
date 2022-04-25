import React from 'react'
import { useEffect, useRef, useState } from "react"
import LeftNavbar from '../components/LeftNavbar/LeftNavbar'
import MainActivity from '../components/MainActivity/MainActivity'
import MediaControls from '../components/MediaControls/MediaControls'
import LocalParticipant from '../components/LocalParticipant/LocalParticipant'
import RemoteParticipant from '../components/RemoteParticipant/RemoteParticipant'
import InviteMemebers from '../components/InviteMembers/InviteMember'
import AuthCodeScreen from '../components/CalendarScreen/AuthCodeScreen'
import { useSelector } from 'react-redux'

function ActivityPage(props) {
  document.title = 'FOG Teams- Activity Page'
  const inviteMem = useSelector(state => state.inviteMembers.inviteMembersScreen);
  const authCodeScreen = useSelector(state => state.calendarEventsReducer.authCodeScreen);
  return (
    <>
      <LeftNavbar />
      <MainActivity />
      {inviteMem && <InviteMemebers />}
      {authCodeScreen && <AuthCodeScreen/>}
      <LocalParticipant/>
      <RemoteParticipant/>
      <MediaControls />
    </>
  )
}
export default ActivityPage
