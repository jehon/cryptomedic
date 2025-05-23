import { useEffect, useRef, useState } from "react";
import { type StringDate } from "../app-patient/objects-patient";
import "../styles/datepicker.css";
import {
  inputValueNow,
  outputDate,
  periodAsHumanReadable
} from "../utils/date";
import IOAbstract, { type IOProps } from "./io-abstract";

// Helper: get days in month
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
// Helper: get day of week (0=Sunday, 1=Monday...)
function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
// Helper: month names in English
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Custom minimal date picker with editable field, quick buttons, and calendar (ENGLISH)
export default function IODate(
  props: {
    min?: string;
    max?: string;
  } & IOProps<StringDate | Date>
) {
  const [selectedDate, setSelectedDate] = useState<string | null>(
    props.value
      ? typeof props.value === "string"
        ? props.value
        : (props.value as Date).toISOString().split("T")[0]
      : null
  );
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Calendar state
  const today = new Date();
  const initialMonth = selectedDate
    ? new Date(selectedDate).getMonth()
    : today.getMonth();
  const initialYear = selectedDate
    ? new Date(selectedDate).getFullYear()
    : today.getFullYear();
  const [calendarMonth, setCalendarMonth] = useState(initialMonth);
  const [calendarYear, setCalendarYear] = useState(initialYear);

  // Close the box if clicking outside
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Reset calendar to selected date or today when opening
  useEffect(() => {
    if (isOpen) {
      const base = selectedDate ? new Date(selectedDate) : new Date();
      setCalendarMonth(base.getMonth());
      setCalendarYear(base.getFullYear());
    }
  }, [isOpen, selectedDate]);

  const handleDateChange = (dateStr: string) => {
    setSelectedDate(dateStr);
    if (props.onChange) props.onChange(dateStr);
  };

  const handleTodayClick = () => {
    const todayStr = inputValueNow();
    handleDateChange(todayStr);
  };

  const handleThreeMonthsClick = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    handleDateChange(date.toISOString().split("T")[0]);
  };

  // Handle manual input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDateChange(e.target.value);
  };

  // Calendar navigation
  const prevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };
  const nextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  // Calendar rendering
  const daysInMonth = getDaysInMonth(calendarYear, calendarMonth);
  const firstDay = getFirstDayOfWeek(calendarYear, calendarMonth);
  // Build calendar grid (array of days, with empty slots at start)
  const calendarGrid: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarGrid.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarGrid.push(d);

  // Handle day click
  const handleDayClick = (day: number | null) => {
    if (!day) return;
    const monthStr = (calendarMonth + 1).toString().padStart(2, "0");
    const dayStr = day.toString().padStart(2, "0");
    const dateStr = `${calendarYear}-${monthStr}-${dayStr}`;
    handleDateChange(dateStr);
  };

  // Highlight selected day
  const selectedDay =
    selectedDate &&
    new Date(selectedDate).getFullYear() === calendarYear &&
    new Date(selectedDate).getMonth() === calendarMonth
      ? new Date(selectedDate).getDate()
      : null;

  return IOAbstract(
    { type: "date", ...props },
    {
      renderOutput: (value) => (
        <>
          <div>{outputDate(value)}</div>
          <div data-e2e="excluded">{periodAsHumanReadable(value)}</div>
        </>
      ),
      renderInput: (value, uuid) => (
        <div
          className="io-date-custom"
          style={{ position: "relative", width: "max-content" }}
          ref={boxRef}
        >
          <input
            id={uuid}
            className="form-control"
            name={props.name}
            value={selectedDate ? selectedDate : ""}
            onClick={() => setIsOpen(!isOpen)}
            onChange={handleInputChange}
            placeholder="Enter or select a date (YYYY-MM-DD)"
            required={props.required}
            style={{
              cursor: "pointer",
              background: isOpen ? "#f8f9fa" : undefined,
              minWidth: 160
            }}
            autoComplete="off"
            type="text"
            inputMode="text"
            pattern="\d{4}-\d{2}-\d{2}"
            min={props.min}
            max={props.max}
          />
          {isOpen && (
            <div
              className="datepicker-popper"
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                background: "white",
                border: "1px solid #dee2e6",
                borderRadius: 4,
                boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
                zIndex: 1000,
                minWidth: 240,
                padding: 12
              }}
            >
              <div className="d-flex gap-2 mb-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleTodayClick}
                >
                  Today
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleThreeMonthsClick}
                >
                  +3 months
                </button>
              </div>
              {/* Calendar custom */}
              <div style={{ marginBottom: 8 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 4
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    onClick={prevMonth}
                  >
                    &lt;
                  </button>
                  <span style={{ fontWeight: 500 }}>
                    {MONTHS[calendarMonth]} {calendarYear}
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    onClick={nextMonth}
                  >
                    &gt;
                  </button>
                </div>
                <table
                  style={{
                    width: "100%",
                    textAlign: "center",
                    borderCollapse: "collapse"
                  }}
                >
                  <thead>
                    <tr>
                      {DAYS.map((d) => (
                        <th
                          key={d}
                          style={{ fontWeight: 400, fontSize: 13, padding: 2 }}
                        >
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({
                      length: Math.ceil(calendarGrid.length / 7)
                    }).map((_, weekIdx) => (
                      <tr key={weekIdx}>
                        {calendarGrid
                          .slice(weekIdx * 7, weekIdx * 7 + 7)
                          .map((day, i) => (
                            <td key={i} style={{ padding: 0 }}>
                              {day ? (
                                <button
                                  type="button"
                                  className={`btn btn-sm ${selectedDay === day ? "btn-primary" : "btn-light"}`}
                                  style={{
                                    width: 28,
                                    height: 28,
                                    margin: 1,
                                    padding: 0
                                  }}
                                  onClick={() => handleDayClick(day)}
                                >
                                  {day}
                                </button>
                              ) : (
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: 28,
                                    height: 28
                                  }}
                                ></span>
                              )}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Validate
                </button>
              </div>
            </div>
          )}
        </div>
      )
    }
  );
}
