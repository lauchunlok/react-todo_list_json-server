import React from "react";
import { FaTimes } from "react-icons/fa";
import dayjs from "dayjs";

const Task = ({ task, onDelete, onToggle }) => {
    // task: object, onDelete: func (from App), onDelete: func (from App)

    const withTime12HourFormat = dayjs(task.selectedDateTime).format(
        "MM/DD/YYYY hh:mm A"
    );
    return (
        <div
            // dynamics style
            className={`task ${task.reminder ? "reminder" : ""}`}
            onDoubleClick={() => onToggle(task.id)}
        >
            <h3>
                {task.text}{" "}
                <FaTimes
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => onDelete(task.id)}
                ></FaTimes>
            </h3>
            <p>{withTime12HourFormat}</p>
        </div>
    );
};

export default Task;
