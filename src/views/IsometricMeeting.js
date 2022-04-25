import React from 'react'

import { useEffect, useRef, useState } from "react"
import MediaControls from '../components/MediaControls/MediaControls'
import IsometricMeeting from '../components/IsometricMeeting/IsometricMeeting'
import LocalParticipant from '../components/LocalParticipant/LocalParticipant'
import RemoteParticipant from '../components/RemoteParticipant/RemoteParticipant'
import { useSelector } from 'react-redux'
import MeetingScreen from '../components/MeetingScreen/MeetingScreen';
import { loadNotesAsync, addNotesAsync, updateNotesAsync } from "../store/thunks/notes";
import LeftNavbar from '../components/LeftNavbar/LeftNavbar';

function ActivityPage(props) {
  const { notes, isLoading } = useSelector((state) => state.notesReducer || {});
  document.title = 'FOG Teams- Activity Page'
  const inviteMem = useSelector(state => state.inviteMembers.inviteMembersScreen);
  const authCodeScreen = useSelector(state => state.calendarEventsReducer.authCodeScreen);
  return (
    <>
      <LeftNavbar />
      {/* <MeetingScreen notesData={notes ? notes : {}} isLoading={isLoading} addNotesAsync={addNotesAsync} updateNotesAsync={updateNotesAsync} /> */}
      <IsometricMeeting />
      <LocalParticipant />
      <RemoteParticipant isometric="true" />
      <MediaControls />

    </>
  )
}
export default ActivityPage
