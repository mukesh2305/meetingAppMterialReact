import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Title from './Title';
import Input from './Input';
import io from "socket.io-client";
import { EllipseBullet } from '../../assets/images/ellipseBullet';
import { useDispatch, useSelector } from "react-redux";
import NotesService from "../../services/notes";
import { addNotesAsync, getNotesGroupDataAsync } from '../../store/thunks/notes';


const socket = io.connect("http://localhost:5000");

function TalkingPoints({ summary, updateNotesAsync, noteArray }) {

	const { notes, isLoading } = useSelector((state) => state.groupNotesReducer || {});
	console.log(notes, "notes+++++++>>>>>>>>>>>>>>>>>>>>>>>>")

	const useStyles = makeStyles(theme => ({
		talkingPoints: {
			padding: '26px 28px',
			cursor: 'auto !important'

		},
		talkingPointsInfo: {
			fontWeight: "500",
			fontSize: "14px",
			color: "#5B6987",
		},
		bulletAndActions: {
			display: 'flex',
			margin: '10px 0 16px',
		},
		bulletPts: {
			marginRight: '12px'
		}
	}))

	const [selectedId, setSelectedId] = useState(null);
	const [tp, setTp] = useState([]);
	// const [approve, setApprove] = useState(false);
	const [newData, setNewData] = useState('');
	const dispatch = useDispatch();
	const [respArray, setRespArray] = useState({
		...noteArray,
		summary: noteArray.summary || []
	});
	const [newShow, setNewShow] = useState("");
	const [editMode, setEditMode] = useState(false);
	const updateTp = (id) => {
		setEditMode(true);
		setSelectedId(id);
	}


	useEffect(() => {
		let note = notes?.map(n => {
			return n.summary && n.summary.map(su => {
				return su.data
			})
		})
		// if (note?.length) {
		setTp(note)
		// }
		// setRespArray({
		// 	...noteArray,
		// 	summary: noteArray.summary || []
		// })
	}, []);

	console.log("tp======++++", tp);

	// useEffect(() => {
	//   console.log(respArray.summary)
	// }, [respArray.summary]);

	const handleKeyDown = async (bool, diff = "change") => {
		if (diff === "change") {
			setEditMode(bool);
			setRespArray((prevState) => ({
				...prevState,
				summary: [{ 'data': newData }]
			}));

			if (newData.length > 0) {
				if (respArray) {
					if (typeof respArray.summary[selectedId] === 'undefined') {
						respArray.summary.push({ 'data': newData })
					}
					else {
						respArray.summary[selectedId]['data'] = newData
					}

					// post api to set the data ------------------------------
					console.log("respArray>>>>>>>>>>>>>>>>>", respArray);
					// NotesService.createNotes(respArray)
					//   .then((response) => console.log("response", response))
					//   .catch((error) => console.log("err", error));
					// respArray?.summary.forEach(res => {
					// console.log("res.................", res.data)
					dispatch(addNotesAsync(respArray))
					dispatch(getNotesGroupDataAsync());
					// })	
					console.log("next steps");


					dispatch(updateNotesAsync(respArray));
				}
			}
		}
		// if(diff === "edit") {

		// }
	}

	const handelChange = async (newD, diff = "change") => {
		if (diff === "change") {
			const newValues = {
				newD: newD,
				takingPoints: "takingPoints",
			}
			setNewData(newD);
			await socket.emit("send_message", newValues);
			//tp[selectedId]['data']=newD;
		}

	}


	useEffect(() => {
		socket.on("taking_ponits", (data) => {
			console.log("data??????????", data)
			setNewData(data);
		});
	}, [newData])

	console.log("tp===========", tp)

	const classes = useStyles();


	return (
		<Box className={classes.talkingPoints}>
			<Title title="Talking Points" />
			{tp ?
				tp.map((val, index) =>
					(val !== undefined && val !== "") && (editMode && selectedId === index ?
						<Box className={classes.bulletAndActions} key={index}>
							<Input placeholder='' inputStyle="" color="#293856" value={val} name="summary" _onKeyDown={(e) => handleKeyDown(e, "not_change")} _onChange={(e) => handelChange(e, "not_change")} />
						</Box>
						: <Box className={classes.bulletAndActions} key={index}>
							<Box className={classes.bulletPts} >
								<EllipseBullet color="#293856" />
							</Box>
							<Box className={classes.talkingPointsInfo} key={index} onClick={() => updateTp(index)}>{val}</Box>
						</Box>)
				)
				: null}

			<Input placeholder='New talking point' inputStyle="" color="#293856" value={newData} name="summary" _onKeyDown={(e) => handleKeyDown(e)} _onChange={(e) => handelChange(e)} />
		</Box>

	)
}
export default TalkingPoints;