import { FC, MouseEvent } from "react";
import { Draggable } from "react-beautiful-dnd";

import LabelTwoToneIcon from '@mui/icons-material/LabelTwoTone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';

import { IconButton } from "@mui/material";

import { Entry } from "../../../interfaces"

import styles from './EntryCard.module.css'
import { getTicketTime } from '../../../utils/utils';
import { useNavigate } from "react-router-dom";

interface Props {
  entry: Entry;
  index: number;
  setActiveDeleteTicket: (entry: Entry) => void;
  setActiveEditTicket: (entry: Entry) => void;
}

export const EntryCard: FC<Props> = ({ entry, index, setActiveDeleteTicket, setActiveEditTicket }) => {
  const navigate = useNavigate();

  const onDelete = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setActiveDeleteTicket(entry)
  };

  const onEdit = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setActiveEditTicket(entry)
  };

  return (
    <Draggable draggableId={entry._id} index={index} key={entry._id}>
      {
        (draggableProvided, draggableSnapshot) => (
          <div
            className={styles.entrycard__container}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
            ref={draggableProvided.innerRef}
          >
            <div className={styles['entrycard__actions--container']} onClick={() => navigate(`/ticket/${entry.categoryId}/${entry._id}`)}>

              <p className={styles.entrycard__text}><LabelTwoToneIcon style={{ color: entry.color || 'rgba(0,0,0,.5)' }} fontSize="small" /> {entry.description}</p>

              {/* <div className={styles['entrycard__buttons--container']}>
                <IconButton
                  className={styles['entrycard__button--edit']}
                  onClick={onEdit}
                >
                  <EditIcon fontSize="small" />
                </IconButton>

                <IconButton
                  className={styles['entrycard__button--delete']}
                  onClick={onDelete}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>

              </div> */}

            </div>


            <p className={styles.entrycard__time}>
              <HourglassTopOutlinedIcon />
              {getTicketTime(entry.createdAt)}
            </p>
          </div>
        )
      }
    </Draggable>
  )
}
