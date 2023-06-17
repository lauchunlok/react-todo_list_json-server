import React, { useState } from "react";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState("");
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    // const [day, setDay] = useState("");
    const [reminder, setReminder] = useState(false);

    const onSumbit = (e) => {
        e.preventDefault();

        if (!text) {
            alert("Please add a task");
            return;
        }

        onAdd({ text, selectedDateTime, reminder });
        setText("");

        setReminder(false);
    };

    return (
        <form className="add-form" onSubmit={onSumbit}>
            <div className="form-control">
                <label htmlFor="">Task</label>
                <input
                    type="text"
                    placeholder="Add Task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></input>
            </div>
            <div className="form-control">
                <label htmlFor="">Day & Time</label>
                <DateTime
                    value={selectedDateTime}
                    onChange={(date) => setSelectedDateTime(date)}
                    dateFormat="YYYY-MM-DD"
                    timeFormat="HH:mm"
                />
            </div>
            <div className="form-control form-control-check">
                <label htmlFor="">Set Reminder</label>
                <input
                    type="checkbox"
                    value={reminder}
                    checked={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                ></input>
            </div>

            <input type="submit" value="Save Task" className="btn btn-block" />
        </form>
    );
};

export default AddTask;
