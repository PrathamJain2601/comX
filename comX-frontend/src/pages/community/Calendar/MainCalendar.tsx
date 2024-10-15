import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { DateTime } from "luxon";

interface CalendarEvent {
  id: string;
  title: string;
  start: DateTime;
  end: DateTime;
  color: string;
}

const colorPalette = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MainCalendar({
  currentDate,
}: {
  currentDate: DateTime;
}) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  useEffect(() => {
    // Generate some sample events
    const sampleEvents = Array.from({ length: 5 }, (_, i) => ({
      id: i.toString(),
      title: `Event ${i + 1}`,
      start: DateTime.now().plus({ days: Math.floor(Math.random() * 30) }),
      end: DateTime.now().plus({ days: Math.floor(Math.random() * 30) + 1 }),
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
    }));
    setEvents(sampleEvents);
  }, []);

  const handleEventSave = (event: CalendarEvent) => {
    if (selectedEvent) {
      setEvents(events.map((e) => (e.id === selectedEvent.id ? event : e)));
    } else {
      setEvents([
        ...events,
        {
          ...event,
          id: Date.now().toString(),
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        },
      ]);
    }
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleEventDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter((e) => e.id !== selectedEvent.id));
      setShowModal(false);
      setSelectedEvent(null);
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = DateTime.local(year, month, 1);
    const lastDay = firstDay.endOf("month");
    const days = [];

    for (let i = 1; i <= lastDay.day; i++) {
      days.push(DateTime.local(year, month, i));
    }

    return days;
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(currentDate.year, currentDate.month);
    const firstDayOfMonth = days[0].weekday;
    const paddingDays = firstDayOfMonth === 7 ? 0 : firstDayOfMonth;

    return (
      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((day) => (
          <div key={day} className="text-center font-bold py-2">
            {day}
          </div>
        ))}
        {Array(paddingDays)
          .fill(null)
          .map((_, index) => (
            <div key={`padding-${index}`} className="p-2"></div>
          ))}
        {days.map((day) => {
          const dayEvents = events.filter(
            (event) =>
              event.start.hasSame(day, "day") || event.end.hasSame(day, "day")
          );
          return (
            <motion.div
              key={day.toISO()}
              className="p-2 border border-gray-200 rounded-lg h-40 w-48"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={`text-center ${
                  day.hasSame(DateTime.now(), "day")
                    ? "font-bold text-blue-500"
                    : ""
                }`}
              >
                {day.day}
              </div>
              {dayEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className={`${event.color} text-white text-xs p-1 mt-1 rounded-md cursor-pointer`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowModal(true);
                  }}
                >
                  {event.title}
                </motion.div>
              ))}
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen text-black">


      <main className="flex-grow p-4 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderCalendar()}
        </motion.div>
      </main>
]
      <motion.button
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowModal(true)}
      >
        <Plus size={24} />
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-xl w-96 relative"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedEvent(null);
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-4">
                {selectedEvent ? "Edit Event" : "Add Event"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newEvent: CalendarEvent = {
                    id: selectedEvent?.id || Date.now().toString(),
                    title: formData.get("title") as string,
                    start: DateTime.fromISO(formData.get("start") as string),
                    end: DateTime.fromISO(formData.get("end") as string),
                    color:
                      selectedEvent?.color ||
                      colorPalette[
                        Math.floor(Math.random() * colorPalette.length)
                      ],
                  };
                  handleEventSave(newEvent);
                }}
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  defaultValue={selectedEvent?.title}
                  className="w-full p-2 mb-4 border rounded bg-white border-gray-300"
                  required
                />
                <input
                  type="datetime-local"
                  name="start"
                  defaultValue={
                    selectedEvent
                      ? selectedEvent.start.toFormat("yyyy-MM-dd'T'HH:mm")
                      : ""
                  }
                  className="w-full p-2 mb-4 border rounded bg-white border-gray-300"
                  required
                />
                <input
                  type="datetime-local"
                  name="end"
                  defaultValue={
                    selectedEvent
                      ? selectedEvent.end.toFormat("yyyy-MM-dd'T'HH:mm")
                      : ""
                  }
                  className="w-full p-2 mb-4 border rounded bg-white border-gray-300"
                  required
                />
                <div className="flex justify-between">
                  <motion.button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Save
                  </motion.button>
                  {selectedEvent && (
                    <motion.button
                      type="button"
                      onClick={handleEventDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Delete
                    </motion.button>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
